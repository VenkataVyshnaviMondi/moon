"use strict";
// Particle steering adapted from the user-supplied ParticleTextEffect.
var AboutParticles;
(function (AboutParticles) {
    function mount(title) {
        const canvas = document.createElement('canvas');
        canvas.className = 'about-particle-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        title.append(canvas);
        const ctx = canvas.getContext('2d');
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        let points = [];
        let frame = 0, disposed = false, visible = true, width = 0, height = 0;
        let pointer = null;
        let previous = 0;
        let stillFrames = 0;
        let pixelStep = 3;
        const draw = (now) => {
            frame = 0;
            if (disposed || !ctx || motion.matches || !visible || document.hidden) {
                previous = 0;
                return;
            }
            const dt = previous ? Math.min(2, (now - previous) / 16.67) : 1;
            previous = now;
            ctx.clearRect(0, 0, width, height);
            let moving = false;
            for (const point of points) {
                let dx = point.tx - point.x, dy = point.ty - point.y;
                const distance = Math.hypot(dx, dy);
                point.vx = (point.vx + dx * .035 * dt) * Math.pow(.78, dt);
                point.vy = (point.vy + dy * .035 * dt) * Math.pow(.78, dt);
                if (pointer) {
                    dx = point.x - pointer.x;
                    dy = point.y - pointer.y;
                    const reach = Math.hypot(dx, dy);
                    if (reach < 55 && reach > .1) {
                        const force = (1 - reach / 55) * 2;
                        point.vx += dx / reach * force * dt;
                        point.vy += dy / reach * force * dt;
                    }
                }
                point.x += point.vx * dt;
                point.y += point.vy * dt;
                if (distance > .15 || Math.abs(point.vx) + Math.abs(point.vy) > .1)
                    moving = true;
                ctx.fillStyle = point.color;
                ctx.globalAlpha = point.alpha;
                ctx.fillRect(point.x, point.y, pixelStep * .85, pixelStep * .85);
            }
            ctx.globalAlpha = 1;
            stillFrames = moving ? 0 : stillFrames + 1;
            if (stillFrames < 5 || pointer)
                frame = requestAnimationFrame(draw);
            else {
                title.classList.remove('particle-ready');
                title.classList.add('particle-settled');
            }
        };
        const schedule = () => { if (!frame && !disposed) {
            previous = 0;
            stillFrames = 0;
            frame = requestAnimationFrame(draw);
        } };
        const rebuild = async () => {
            if (!ctx || disposed)
                return;
            if (motion.matches) {
                title.classList.remove('particle-ready');
                cancelAnimationFrame(frame);
                frame = 0;
                return;
            }
            await document.fonts.ready;
            const image = title.querySelector('img');
            try {
                await image?.decode();
            }
            catch {
                return;
            }
            if (disposed || motion.matches)
                return;
            const rect = title.getBoundingClientRect();
            width = Math.round(rect.width);
            height = Math.round(rect.height);
            if (!width || !height)
                return;
            const source = document.createElement('canvas');
            source.width = width;
            source.height = height;
            const sourceCtx = source.getContext('2d');
            if (!sourceCtx)
                return;
            for (const span of title.querySelectorAll(':scope > span')) {
                const bounds = span.getBoundingClientRect();
                const style = getComputedStyle(span);
                sourceCtx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
                sourceCtx.letterSpacing = style.letterSpacing;
                sourceCtx.textBaseline = 'middle';
                sourceCtx.fillStyle = '#000000';
                sourceCtx.fillText(span.textContent || '', bounds.left - rect.left, bounds.top - rect.top + bounds.height / 2);
            }
            if (image && image.naturalWidth) {
                const box = image.getBoundingClientRect();
                const scale = Math.min(box.width / image.naturalWidth, box.height / image.naturalHeight);
                const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
                sourceCtx.drawImage(image, box.left - rect.left + (box.width - w) / 2, box.top - rect.top + (box.height - h) / 2, w, h);
            }
            const pixels = sourceCtx.getImageData(0, 0, width, height).data;
            points = [];
            pixelStep = width < 600 ? 2 : 3;
            for (let y = 0; y < height; y += pixelStep)
                for (let x = 0; x < width; x += pixelStep) {
                    const i = (y * width + x) * 4;
                    if (pixels[i + 3] < 60)
                        continue;
                    points.push({ x: Math.random() * width, y: Math.random() * height, tx: x, ty: y, vx: 0, vy: 0, color: `rgb(${pixels[i]},${pixels[i + 1]},${pixels[i + 2]})`, alpha: pixels[i + 3] / 255 });
                }
            const dpr = Math.min(devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            title.classList.remove('particle-settled');
            title.classList.add('particle-ready');
            schedule();
        };
        const move = (event) => { if (title.classList.contains('particle-settled'))
            return; const rect = title.getBoundingClientRect(); pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }; schedule(); };
        const leave = () => { pointer = null; schedule(); };
        const change = () => { void rebuild(); };
        let resizeTimer = 0;
        const resize = new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(change, 120); });
        resize.observe(title);
        const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible)
            schedule(); });
        observer.observe(title);
        const visibility = () => { if (!document.hidden)
            schedule(); };
        document.addEventListener('visibilitychange', visibility);
        title.addEventListener('pointermove', move);
        title.addEventListener('pointerleave', leave);
        title.addEventListener('pointerup', leave);
        motion.addEventListener('change', change);
        void rebuild();
        return () => { disposed = true; cancelAnimationFrame(frame); clearTimeout(resizeTimer); resize.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); title.removeEventListener('pointermove', move); title.removeEventListener('pointerleave', leave); title.removeEventListener('pointerup', leave); motion.removeEventListener('change', change); title.classList.remove('particle-ready'); canvas.remove(); };
    }
    AboutParticles.mount = mount;
})(AboutParticles || (AboutParticles = {}));
