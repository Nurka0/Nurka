'use strict';
(() => {
  const toggle=document.getElementById('menuToggle');
  const nav=document.getElementById('nav');
  function closeNav(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');}
  toggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(isOpen));toggle.setAttribute('aria-label',isOpen?'Закрыть меню':'Открыть меню');});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeNav));
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape')closeNav()});
  const cards=[...document.querySelectorAll('.service-card')];
  const filters=[...document.querySelectorAll('.filter')];
  const count=document.getElementById('serviceCount');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
    let found=0;cards.forEach(card=>{const show=btn.dataset.filter==='all'||card.dataset.category===btn.dataset.filter;card.hidden=!show;if(show)found++});
    count.textContent=found+' '+(found===1?'услуга':found>=2&&found<=4?'услуги':'услуг');
  }));
  const form=document.getElementById('requestForm');
  const error=document.getElementById('formError');
  const service=document.getElementById('service');
  const preview=document.getElementById('preview');
  const requestText=document.getElementById('requestText');
  const copyStatus=document.getElementById('copyStatus');
  const contact=document.getElementById('contact');
  document.querySelectorAll('.choose-service').forEach(btn=>btn.addEventListener('click',()=>{
    service.value=btn.dataset.service;
    document.getElementById('booking').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    setTimeout(()=>document.getElementById('name').focus({preventScroll:true}),150);
  }));
  form.addEventListener('submit',ev=>{
    ev.preventDefault();
    const name=document.getElementById('name').value.trim();
    const cn=contact.value.trim();
    const car=document.getElementById('car').value.trim();
    const srv=service.value;
    const comment=document.getElementById('comment').value.trim();
    if(name.length<2||cn.length<5||car.length<3||!srv){
      error.hidden=false;error.textContent='Заполните имя (от 2 символов), контакт (от 5 символов), автомобиль (от 3 символов) и выберите услугу.';
      const firstInvalid=[['name',name.length<2],['contact',cn.length<5],['car',car.length<3],['service',!srv]].find(([,bad])=>bad);
      if(firstInvalid)document.getElementById(firstInvalid[0]).focus();
      return;
    }
    error.hidden=true;
    const lines=['ПРЕДВАРИТЕЛЬНАЯ ЗАЯВКА — ГАРАЖ №12','Имя: '+name,'Контакт: '+cn,'Автомобиль: '+car,'Услуга: '+srv];
    if(comment)lines.push('Комментарий: '+comment);
    lines.push('','Составлено на учебном сайте. Автоматически не отправлено.');
    requestText.textContent=lines.join('\n');
    form.hidden=true;preview.hidden=false;copyStatus.textContent='';
    preview.scrollIntoView({behavior:'auto',block:'nearest'});
  });
  document.getElementById('editForm').addEventListener('click',()=>{preview.hidden=true;form.hidden=false;document.getElementById('name').focus()});
  document.getElementById('copyRequest').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(requestText.textContent);copyStatus.textContent='Текст скопирован. Можете вставить его в сообщение.'}
    catch{const sel=window.getSelection();const range=document.createRange();range.selectNodeContents(requestText);sel.removeAllRanges();sel.addRange(range);copyStatus.textContent='Автоматическое копирование недоступно. Выделенный текст можно скопировать Ctrl+C.'}
  });
  // Если локальный кадр мастерской есть, используем его вместо онлайн-фотографии на главном экране.
  const heroImage=new Image();
  heroImage.onload=()=>{
    document.querySelector('.hero-img').style.backgroundImage =
      "linear-gradient(90deg,rgba(17,20,18,.92) 0%,rgba(17,20,18,.80) 35%,rgba(17,20,18,.30) 80%),url('assets/images/workshop.webp')";
  };
  heroImage.src='assets/images/workshop.webp';
  // При отсутствии скачанных локальных файлов используем проверенные фотоссылки.
  
})();
