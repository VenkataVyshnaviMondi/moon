const fs=require('fs'),vm=require('vm'),assert=require('assert');
const el=()=>({innerHTML:'',textContent:'',setAttribute(){},removeAttribute(){},classList:{remove(){},toggle(){return false}}});
const main=el(),menu=el(),nav=el(),year=el();
const doc={querySelector:s=>({'main':main,'.menu-toggle':menu,'nav':nav,'#year':year}[s]||null),querySelectorAll:()=>[],hidden:false};
const context={document:doc,location:{hash:'#/careers'},window:{scrollTo(){},addEventListener(){}},setInterval(){},clearInterval(){},URLSearchParams,matchMedia:()=>({matches:true})};
vm.createContext(context);for(const file of ['career-locations.js','careers.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);vm.runInContext(fs.readFileSync('app.js','utf8'),context);
assert(main.innerHTML.includes('Web Developer'));
assert(main.innerHTML.includes('career-dialog'));
assert.equal((main.innerHTML.match(/data-apply-role=/g)||[]).length,6);
assert(main.innerHTML.includes('name="attachment"'));
assert(main.innerHTML.includes('name="consent" required'));
assert(main.innerHTML.includes('name="role" required'));
assert(main.innerHTML.includes('name="district" disabled'));
assert(vm.runInContext('careerLocations.states.length',context)>25);
for(const page of ['home','about','services','clients','careers','contact']){const html=vm.runInContext(`pages.${page}()`,context);assert(html.length>200,page);for(const match of html.matchAll(/<img[^>]+src="([^"]+)"/g))assert(fs.existsSync(match[1]),match[1]);}
const contact=vm.runInContext('pages.contact()',context);assert.equal((contact.match(/ required(?=[ >])/g)||[]).length,4);assert(contact.includes('pattern="[0-9]{10}"'));assert(contact.includes('maps.google.com'));
assert.equal(vm.runInContext('services.length',context),8);assert.equal(vm.runInContext('leaders.length',context),2);
console.log('Passed: all six page templates, all referenced images, eight services, two CEOs, four required contact fields, phone pattern, map, six job roles, application dialog and required application controls.');
