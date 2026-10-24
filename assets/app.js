const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');const label=toggle?.querySelector('.sr-only');if(label)label.textContent='Ouvrir le menu';}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);toggle.querySelector('.sr-only').textContent=open?'Fermer le menu':'Ouvrir le menu';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){closeMenu();toggle.focus();}});
document.addEventListener('click',e=>{if(nav?.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
matchMedia('(min-width:981px)').addEventListener('change',closeMenu);
document.querySelectorAll('.enquiry-form').forEach(form=>{
 const contact=form.querySelector('[name="Contact"]');
 contact.addEventListener('input',()=>contact.setCustomValidity(''));
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const value=contact.value.trim();
  const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const phone=/^[+\d\s().-]+$/.test(value)&&value.replace(/\D/g,'').length>=9&&value.replace(/\D/g,'').length<=15;
  if(!email&&!phone){contact.setCustomValidity('Indiquez une adresse email valide ou un numéro de téléphone complet.');contact.reportValidity();return;}
  const status=form.querySelector('.form-status');const button=form.querySelector('button[type="submit"]');
  const original=button.innerHTML;button.disabled=true;button.textContent='Envoi en cours…';status.className='form-status';status.textContent='';
  try{const data=new FormData(form);if(email)data.set('email',value);const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});if(!response.ok)throw new Error('Envoi refusé');form.reset();status.className='form-status success';status.textContent='Votre demande a bien été transmise. Merci. Pour toute urgence, appelez le 07 45 07 49 88.';}
  catch{status.className='form-status error';status.textContent='Votre demande n’a pas pu être envoyée. Vos informations restent dans le formulaire. Appelez le 07 45 07 49 88 ou écrivez à contact@asixassurance.fr.';}
  finally{button.disabled=false;button.innerHTML=original;}
 });
});

document.addEventListener('click',event=>{document.querySelectorAll('.auto-subtabs[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false;});});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.auto-subtabs[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus();});});
