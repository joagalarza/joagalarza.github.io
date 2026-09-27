const main=document.querySelector('main');
const theme=document.querySelector('#theme');
const names={about:'About',blog:'Blog',talks:'Talks & Presentations',projects:'Projects',teaching:'Teaching',leadership:'Leadership',beyond:'Beyond Academia'};
const posts={
  'blog/desde-cero':{template:'post-desde-cero',title:'Desde Cero: Two Cohorts, and a Third on the Way'},
  'blog/learning-to-belong':{template:'post-learning-to-belong',title:'Learning to Belong While Finding My Way'}
};
function render(){
  const key=location.hash.slice(1);
  const post=Object.hasOwn(posts,key)?posts[key]:null;
  const page=post?'blog':Object.hasOwn(names,key)?key:'about';
  const template=document.getElementById(post?post.template:page);
  main.replaceChildren(template.content.cloneNode(true));
  document.querySelectorAll('nav a').forEach(a=>{
    if(a.hash==='#'+page)a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
  document.title='Joaquin Galarza · '+(post?post.title:names[page]);
  window.scrollTo(0,0);
}
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark';theme.innerHTML=dark?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.8 14.5A9 9 0 0 1 9.5 3.2 9 9 0 1 0 20.8 14.5Z"/></svg>';theme.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');theme.title=theme.getAttribute('aria-label')}
theme.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('jg-theme',next)}catch(e){}updateTheme()});window.addEventListener('hashchange',()=>{render();main.focus({preventScroll:true})});render();updateTheme();
