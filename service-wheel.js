"use strict";
// Geometry adapted from the user-supplied WorksWheel component.
var ServiceWheel;
(function (ServiceWheel) {
    function mount(root) {
        const stage = root.querySelector('.service-wheel-stage');
        const wheel = root.querySelector('.service-wheel-deck');
        if (!stage || !wheel)
            return;
        const cards = Array.from(root.querySelectorAll('.service-wheel-card'));
        const buttons = Array.from(root.querySelectorAll('[data-service-index]'));
        const title = root.querySelector('.service-wheel-title');
        const label = root.querySelector('.service-wheel-label');
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        let turn = 0, target = 0, frame = 0, settle = 0, active = -1;
        let drag = null;
        let travel = 0;
        let visible = false;
        const scene = root.closest('[data-scene]');
        let metrics = { width: 0, height: 0, ring: 0, drum: 0, bow: 0, scale: 1 };
        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
        const radians = (degrees) => degrees * Math.PI / 180;
        const draw = () => {
            frame = 0;
            if (motion.matches || !visible || document.hidden || scene?.getAttribute('aria-hidden') === 'true')
                return;
            const gap = target - turn;
            turn = Math.abs(gap) < .0005 ? target : turn + gap * .12;
            const blend = clamp(turn, 0, 1);
            const position = Math.max(0, turn - 1);
            wheel.style.transform = `translateZ(${-blend * metrics.drum}px)`;
            cards.forEach((card, index) => {
                const distance = index - position;
                const angle = distance * 40;
                const bow = -metrics.bow * (1 - Math.cos(radians(angle)));
                card.style.transform = `translateX(${blend * bow}px) rotateZ(${(1 - blend) * distance * 360 / cards.length}deg) translateY(${-(1 - blend) * metrics.ring}px) rotateX(${blend * angle}deg) translateZ(${blend * metrics.drum}px)`;
                const hidden = blend > .5 && Math.abs(distance) > 1.6;
                card.style.opacity = hidden ? '0' : '1';
                card.style.pointerEvents = hidden ? 'none' : 'auto';
                card.tabIndex = hidden ? -1 : 0;
                card.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
                const face = card.firstElementChild;
                face.style.transform = `scale(${metrics.scale + (1 - metrics.scale) * blend})`;
            });
            if (label)
                label.style.opacity = String(1 - blend);
            if (title)
                title.style.opacity = String(blend);
            const nearest = clamp(Math.round(position), 0, cards.length - 1);
            if (active !== nearest) {
                active = nearest;
                if (title)
                    title.textContent = cards[nearest].dataset.title || '';
                buttons.forEach((button, index) => { button.removeAttribute('aria-current'); if (index === active)
                    button.setAttribute('aria-current', 'true'); });
            }
            if (Math.abs(target - turn) > .0005)
                frame = requestAnimationFrame(draw);
        };
        const schedule = () => { if (!frame)
            frame = requestAnimationFrame(draw); };
        const resize = () => {
            root.classList.toggle('wheel-static', motion.matches);
            if (motion.matches) {
                cards.forEach(card => { card.removeAttribute('style'); card.tabIndex = 0; card.firstElementChild.removeAttribute('style'); });
                return;
            }
            const width = Math.min(stage.clientHeight * .38 * 1.45, stage.clientWidth * .34);
            const height = width / 1.45;
            const ring = height * 1.14;
            metrics = { width, height, ring, drum: height * 2.22, bow: height * 1.82, scale: clamp((2 * Math.PI * ring / cards.length * .82) / Math.max(1, width), .16, 1) };
            stage.style.perspective = `${height * 2.7}px`;
            cards.forEach(card => { card.style.width = `${width}px`; card.style.height = `${height}px`; card.style.marginLeft = `${-width / 2}px`; card.style.marginTop = `${-height / 2}px`; });
            schedule();
        };
        const to = (value) => { target = clamp(value, 0, cards.length); schedule(); };
        const onWheel = (event) => {
            if (motion.matches || event.ctrlKey)
                return;
            const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1);
            const next = target + delta / 900;
            if (next > 0 && next < cards.length)
                event.preventDefault();
            to(next);
            clearTimeout(settle);
            settle = window.setTimeout(() => to(Math.round(target)), 140);
        };
        const down = (event) => { if (motion.matches || event.button !== 0)
            return; drag = event.clientY; travel = 0; };
        const move = (event) => {
            if (drag === null)
                return;
            const delta = drag - event.clientY;
            travel += Math.abs(delta);
            if (travel > 6 && !stage.hasPointerCapture(event.pointerId))
                stage.setPointerCapture(event.pointerId);
            to(target + delta / 420);
            drag = event.clientY;
        };
        const up = () => { drag = null; if (target > 1)
            to(Math.round(target)); };
        const click = (event) => { if (travel > 6) {
            event.preventDefault();
            travel = 0;
        } };
        const key = (event) => {
            if (motion.matches)
                return;
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                event.preventDefault();
                to(Math.round(target) + 1);
            }
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                event.preventDefault();
                to(Math.round(target) - 1);
            }
        };
        buttons.forEach((button, index) => { button.onclick = () => to(index + 1); });
        stage.addEventListener('wheel', onWheel, { passive: false });
        stage.addEventListener('pointerdown', down);
        stage.addEventListener('pointermove', move);
        stage.addEventListener('pointerup', up);
        stage.addEventListener('pointercancel', up);
        stage.addEventListener('click', click, true);
        stage.addEventListener('keydown', key);
        motion.addEventListener('change', resize);
        const observer = new ResizeObserver(resize);
        observer.observe(stage);
        const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); });
        visibility.observe(root);
        const sceneObserver = new MutationObserver(schedule);
        if (scene)
            sceneObserver.observe(scene, { attributes: true, attributeFilter: ['aria-hidden'] });
        resize();
        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(settle);
            observer.disconnect();
            visibility.disconnect();
            sceneObserver.disconnect();
            motion.removeEventListener('change', resize);
            stage.removeEventListener('wheel', onWheel);
            stage.removeEventListener('pointerdown', down);
            stage.removeEventListener('pointermove', move);
            stage.removeEventListener('pointerup', up);
            stage.removeEventListener('pointercancel', up);
            stage.removeEventListener('click', click, true);
            stage.removeEventListener('keydown', key);
        };
    }
    ServiceWheel.mount = mount;
})(ServiceWheel || (ServiceWheel = {}));
