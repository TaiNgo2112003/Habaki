import {properties,locations,types,number,filterProperties,isValidPhone} from './catalog.js';

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=name=>`<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const state={deal:'rent',type:'all',location:'all',area:'all',price:'all',sort:'featured',limit:6,view:'grid'};
const allowed={deal:['rent','sale'],type:['all',...Object.keys(types)],location:['all',...Object.keys(locations)],area:['all','small','medium','large'],price:['all','low','high','sale-low','sale-high'],sort:['featured','price-asc','price-desc','area-desc']};
const initialParams=new URLSearchParams(location.search);
for(const [key,values] of Object.entries(allowed)){if(values.includes(initialParams.get(key)))state[key]=initialParams.get(key);}
let saved=new Set();
try{const stored=JSON.parse(localStorage.getItem('habaki-saved')||'[]');if(Array.isArray(stored))saved=new Set(stored.filter(id=>properties.some(p=>p.id===id)));}catch{/* Storage may be unavailable in private browsing. */}
let toastTimer;
let lastFocused;
let currentDialog='';
let lastSubmission=0;

function track(event,details={}){
  window.dataLayer=window.dataLayer||[];
  // Event scaffolding only. No third-party pixels or personal information are sent.
  window.dataLayer.push({event,...details,demo:true});
}
function toast(message){$('.toast').textContent=message;$('.toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').hidden=true,3200);}
function saveButton(p,extra=''){const active=saved.has(p.id);return `<button class="${extra||'card-save'}" data-save="${p.id}" aria-label="${active?'Bỏ lưu':'Lưu tin'} ${p.id}" aria-pressed="${active}">${icon('heart')}</button>`;}
function priceMarkup(p){return `<div class="card-price"><strong>${number(p.price)} đ</strong><span>/ m²${p.deal==='rent'?' / tháng':''}</span></div>`;}
function card(p){return `<article class="listing-card">
  <div class="card-photo"><a href="#mat-bang-${p.id}" data-detail="${p.id}" aria-label="Xem ${esc(p.title)}"><img src="assets/${p.image}" alt="Ảnh minh họa ${esc(types[p.type].toLowerCase())}" loading="lazy" width="900" height="600"></a><div class="card-badges">${p.featured?'<span class="badge badge-featured">Nổi bật</span>':''}<span class="badge">${icon('factory')}${p.location==='ngoai-kcn'?'Ngoài KCN':p.location==='nghi-son'?'Trong KKT':'Trong KCN'}</span></div>${saveButton(p)}<span class="badge badge-deal">${p.deal==='rent'?'Cho thuê':'Chuyển nhượng'}</span><span class="photo-count">Ảnh minh họa</span></div>
  <div class="card-body"><div class="card-code"><span><span class="code-dot">●</span> ${types[p.type].toUpperCase()}</span><span>${p.id}</span></div><h3 class="card-title"><a href="#mat-bang-${p.id}" data-detail="${p.id}">${esc(p.title)}</a></h3><div class="card-location">${icon('pin')}${locations[p.location]}, Thanh Hóa</div><div class="card-features"><span>${icon('area')}${number(p.area)} m²</span><span>${icon(p.type==='land'?'sun':'factory')}${p.type==='land'?'Đất công nghiệp':'Cao '+p.height}</span></div>${priceMarkup(p)}<div class="card-footer"><span>Dữ liệu minh họa</span><button data-detail="${p.id}">Xem chi tiết ${icon('up-right')}</button></div></div>
</article>`;}
function updateSavedCount(){const el=$('.saved-count');el.textContent=saved.size;el.hidden=!saved.size;}
function syncControls(){
  $('#filter-type').value=state.type;$('#filter-location').value=state.location;$('#filter-area').value=state.area;$('#filter-price').value=state.price;$('#sort-order').value=state.sort;
  $$('[data-deal]').forEach(b=>{const on=b.dataset.deal===state.deal;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on);});
  $$('[data-category]').forEach(b=>{const on=b.dataset.category===state.type;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on);});
  $('[data-category="all"] span').textContent=properties.filter(p=>p.deal===state.deal).length;
}
function updateURL(){
  const url=new URL(location.href);
  for(const key of Object.keys(allowed)){if(state[key]===(key==='deal'?'rent':key==='sort'?'featured':'all'))url.searchParams.delete(key);else url.searchParams.set(key,state[key]);}
  history.replaceState(null,'',url);
}
function render(){
  const found=filterProperties(state);const showing=found.slice(0,state.limit);
  $('#listing-grid').innerHTML=showing.map(card).join('');
  $('#listing-grid').classList.toggle('list-view',state.view==='list');
  $('#results-count').innerHTML=`<strong>${found.length} mặt bằng ${state.deal==='rent'?'cho thuê':'chuyển nhượng'}</strong> ${state.location==='all'?'tại Thanh Hóa':'tại '+locations[state.location]}`;
  $('#empty-results').hidden=found.length>0;$('#load-more').hidden=state.limit>=found.length;
  $('#page-info').textContent=`Hiển thị ${showing.length} / ${found.length} mặt bằng`;
  const labels=[];
  if(state.type!=='all')labels.push(types[state.type]);
  if(state.location!=='all')labels.push(locations[state.location]);
  if(state.area!=='all')labels.push($('#filter-area option[value="'+state.area+'"]').textContent);
  if(state.price!=='all')labels.push($('#filter-price option[value="'+state.price+'"]').textContent);
  $('#active-filters').hidden=!labels.length;
  $('#active-filters').innerHTML=labels.map(s=>`<span>${esc(s)}</span>`).join('')+(labels.length?'<button data-reset>Xóa bộ lọc ×</button>':'');
  syncControls();updateURL();
}
function applyFilters(scroll=false){state.limit=6;render();if(scroll)$('#bang-hang').scrollIntoView({behavior:'smooth'});track('search_properties',{deal:state.deal,type:state.type,location:state.location,area:state.area,price:state.price});}
function resetFilters(){Object.assign(state,{deal:'rent',type:'all',location:'all',area:'all',price:'all',sort:'featured',limit:6});render();}
function openDialog(html,kind='info'){
  const dialog=$('#main-dialog');if(!dialog.open)lastFocused=document.activeElement;
  $('#dialog-content').innerHTML=html;currentDialog=kind;
  if(!dialog.open){dialog.showModal();document.body.style.overflow='hidden';}
  dialog.scrollTop=0;
  $('.dialog-close').focus({preventScroll:true});
}
function closeDialog(){const dialog=$('#main-dialog');if(dialog.open)dialog.close();}
function showDetail(id){
  const p=properties.find(p=>p.id===id);if(!p)return;
  openDialog(`<img class="detail-image" src="assets/${p.image}" alt="Ảnh minh họa ${esc(p.title)}"><p class="detail-photo-note">Ảnh và thông số minh họa · Không phải chào bán chính thức</p><div class="detail-heading"><div class="eyebrow"><span></span>${p.id} · ${p.deal==='rent'?'CHO THUÊ':'CHUYỂN NHƯỢNG'}</div><h2 id="dialog-title">${esc(p.title)}</h2><p>${icon('pin')}${locations[p.location]}, Thanh Hóa</p></div><div class="detail-specs"><div><small>DIỆN TÍCH</small><strong>${number(p.area)} m²</strong></div><div><small>LOẠI HÌNH</small><strong>${types[p.type]}</strong></div><div><small>${p.type==='land'?'CHIỀU CAO XÂY DỰNG':'CHIỀU CAO XƯỞNG'}</small><strong>${p.height}</strong></div><div><small>ĐIỆN CẤP (MẪU)</small><strong>${p.power}</strong></div></div><p class="detail-description">${p.description}</p><div class="detail-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="detail-actions">${priceMarkup(p)}${saveButton(p,'icon-button')}<button class="button button-orange" data-consult="Đăng ký khảo sát ${p.id} — ${esc(p.title)}" data-property="${p.id}">Đăng ký khảo sát ${icon('arrow')}</button></div>`,'detail');
  track('view_property',{property_id:id});
}
function showSaved(){
  const found=properties.filter(p=>saved.has(p.id));
  openDialog(`<div class="dialog-heading"><div class="eyebrow"><span></span> KHÔNG GIAN BẠN QUAN TÂM</div><h2 id="dialog-title">Tin đã lưu <span>(${found.length})</span></h2><p>Lưu lựa chọn yêu thích để dễ dàng xem lại trên trình duyệt này.</p></div>${found.length?`<div class="saved-grid">${found.map(card).join('')}</div>`:`<div class="saved-empty">${icon('heart')}<h3>Chưa có tin nào được lưu</h3><p>Chạm vào biểu tượng trái tim trên mặt bằng bạn quan tâm.</p><button class="button button-dark" data-close-dialog>Khám phá bảng hàng ${icon('arrow')}</button></div>`}`,'saved');
}
function showConsult(need,propertyId=''){
  const cloned=$('#contact-form').cloneNode(true);cloned.removeAttribute('id');cloned.querySelector('h3').remove();cloned.querySelector('.form-kicker').remove();cloned.querySelector('p').remove();
  cloned.querySelector('[name="need"]').setAttribute('value',need);
  cloned.dataset.property=propertyId;
  openDialog(`<div class="modal-form"><div class="eyebrow"><span></span> KẾT NỐI CÙNG HABAKI</div><h2 id="dialog-title">Bắt đầu bước tiến mới.</h2><p>Để lại thông tin để trải nghiệm form tư vấn.</p>${cloned.outerHTML}</div>`,'consult');
  // A cloned form never inherits values from another visitor interaction.
  const form=$('.lead-form',$('#dialog-content'));form.reset();form.querySelector('[name="need"]').value=need;
  form.querySelector('.form-result').hidden=true;
  form.querySelector('button[type="submit"]').disabled=false;
  track('open_lead_form',{property_id:propertyId||null});
}
function submitLead(form){
  const result=$('.form-result',form);result.classList.remove('error');
  const formData=new FormData(form);const name=String(formData.get('name')||'').trim();const phone=String(formData.get('phone')||'').trim();const need=String(formData.get('need')||'').trim();
  const fail=message=>{result.textContent=message;result.classList.add('error');result.hidden=false;};
  if(formData.get('website')){fail('Không thể xử lý yêu cầu này. Vui lòng thử lại.');return;}
  if(name.length<2||need.length<3){fail('Vui lòng nhập họ tên và nhu cầu đầy đủ.');return;}
  const phoneField=$('[name="phone"]',form);phoneField.removeAttribute('aria-invalid');
  if(!isValidPhone(phone)){phoneField.setAttribute('aria-invalid','true');fail('Vui lòng nhập số di động Việt Nam hợp lệ, ví dụ 0912 345 678.');phoneField.focus();return;}
  if(Date.now()-lastSubmission<15000){fail('Bạn vừa gửi thử form. Vui lòng chờ 15 giây trước khi thử lại.');return;}
  lastSubmission=Date.now();
  result.textContent=`Cảm ơn ${name}! Form đã được kiểm tra thành công. Đây là bản demo: yêu cầu chưa được gửi đến Habaki, SO9 hoặc Google Sheets. Thông tin của bạn không được lưu.`;result.hidden=false;
  track('demo_lead_validated',{property_id:form.dataset.property||null});
  form.reset();
  // No lead payload is persisted or sent. Real delivery belongs on the WordPress server.
}

$('#search-form').addEventListener('submit',e=>{e.preventDefault();state.type=$('#filter-type').value;state.location=$('#filter-location').value;state.area=$('#filter-area').value;applyFilters(true);});
$('#filter-price').addEventListener('change',e=>{state.price=e.target.value;if(state.price.startsWith('sale'))state.deal='sale';else if(state.price!=='all')state.deal='rent';applyFilters();});
$('#sort-order').addEventListener('change',e=>{state.sort=e.target.value;render();});
$('#load-more').addEventListener('click',()=>{state.limit+=6;render();});
$('#reset-filters').addEventListener('click',resetFilters);
$('.saved-trigger').addEventListener('click',showSaved);
$('.dialog-close').addEventListener('click',closeDialog);
$('#main-dialog').addEventListener('click',e=>{if(e.target===$('#main-dialog')){const rect=e.target.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)closeDialog();}});
$('#main-dialog').addEventListener('close',()=>{document.body.style.overflow='';currentDialog='';if(lastFocused?.isConnected)lastFocused.focus({preventScroll:true});else $('.saved-trigger').focus({preventScroll:true});});
$('.mobile-menu-button').addEventListener('click',()=>{const button=$('.mobile-menu-button');const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',!open);button.setAttribute('aria-label',open?'Mở menu':'Đóng menu');$('#mobile-nav').hidden=open;});
document.addEventListener('submit',e=>{if(e.target.matches('.lead-form')){e.preventDefault();submitLead(e.target);}});
document.addEventListener('click',e=>{
  if(!(e.target instanceof Element))return;const button=e.target.closest('button,a');if(!button)return;
  if(button.closest('#mobile-nav')){$('#mobile-nav').hidden=true;$('.mobile-menu-button').setAttribute('aria-expanded','false');$('.mobile-menu-button').setAttribute('aria-label','Mở menu');}
  if(button.hasAttribute('data-detail')){e.preventDefault();showDetail(button.dataset.detail);}
  if(button.hasAttribute('data-save')){
    const id=button.dataset.save;const removing=saved.has(id);removing?saved.delete(id):saved.add(id);
    let persisted=true;try{localStorage.setItem('habaki-saved',JSON.stringify([...saved]));}catch{persisted=false;}
    updateSavedCount();$$(`[data-save="${id}"]`).forEach(el=>{el.setAttribute('aria-pressed',!removing);el.setAttribute('aria-label',`${removing?'Lưu tin':'Bỏ lưu'} ${id}`);});
    if(currentDialog==='saved')showSaved();
    toast(removing?'Đã bỏ lưu mặt bằng':persisted?'Đã lưu mặt bằng để xem lại':'Đã lưu tạm trong phiên này');track('save_property',{property_id:id,saved:!removing});
  }
  if(button.hasAttribute('data-consult'))showConsult(button.dataset.consult,button.dataset.property);
  if(button.hasAttribute('data-deal')){state.deal=button.dataset.deal;state.price='all';applyFilters();}
  if(button.hasAttribute('data-category')){state.type=button.dataset.category;applyFilters();}
  if(button.hasAttribute('data-view')){state.view=button.dataset.view;$$('[data-view]').forEach(b=>{const on=b===button;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',on);});render();}
  if(button.hasAttribute('data-quick')){state.location=button.dataset.quick;state.type=$('#filter-type').value;state.area=$('#filter-area').value;applyFilters(true);}
  if(button.hasAttribute('data-region')){Object.assign(state,{location:button.dataset.region,type:'all',area:'all',price:'all'});applyFilters(true);}
  if(button.hasAttribute('data-reset'))resetFilters();
  if(button.hasAttribute('data-close-dialog')){closeDialog();$('#bang-hang').scrollIntoView({behavior:'smooth'});}
  if(button.hasAttribute('data-footer-type')){Object.assign(state,{deal:'rent',type:button.dataset.footerType,location:'all',area:'all',price:'all'});applyFilters(true);}
  if(button.hasAttribute('data-footer-sale')){Object.assign(state,{deal:'sale',type:'factory',location:'all',area:'all',price:'all'});applyFilters(true);}
  if(button.hasAttribute('data-channel')){const channel=button.dataset.channel;openDialog(`<div class="info-content"><div class="eyebrow"><span></span> KẾT NỐI HABAKI</div><h2 id="dialog-title">${esc(channel==='TikTok'?'Khám phá mặt bằng qua video':'Tư vấn cùng Habaki qua Zalo')}</h2><p>${channel==='TikTok'?'Kênh TikTok chính thức và video thực tế sẽ được bổ sung khi triển khai. Bản demo sử dụng ảnh minh họa và không tải trình phát video bên ngoài để giữ tốc độ trang.':'Đường dẫn Zalo OA chính thức sẽ được bổ sung khi triển khai. Bạn có thể trải nghiệm form gửi nhu cầu tư vấn trong bản demo này.'}</p><button class="button button-orange" data-consult="Tư vấn mặt bằng qua ${esc(channel)}">Để lại nhu cầu ${icon('arrow')}</button></div>`);}
  if(button.hasAttribute('data-privacy'))openDialog('<div class="info-content"><div class="eyebrow"><span></span> THÔNG TIN MINH BẠCH</div><h2 id="dialog-title">Bản demo & quyền riêng tư</h2><p>Website này là bản demo giao diện Habaki trên GitHub Pages. Toàn bộ bảng hàng, giá, thông số và ảnh chỉ để minh họa. Không sử dụng các thông tin này làm căn cứ giao dịch.</p><p>Form chỉ kiểm tra dữ liệu tại trình duyệt, không gửi hay lưu họ tên, số điện thoại và nhu cầu. Tính năng lưu tin ghi mã mặt bằng trong bộ nhớ trình duyệt; bạn có thể bỏ lưu từng tin bằng biểu tượng trái tim hoặc xóa dữ liệu website.</p><p>Các nút Zalo, hotline và TikTok đang là điểm chờ cấu hình. Google Sheets, SO9 Inbox, chống spam Turnstile và các mã quảng cáo cần được cấu hình trên WordPress khi triển khai chính thức. Bản demo không cài pixel quảng cáo.</p></div>');
});

for(const el of $$('[data-region-count]'))el.textContent=properties.filter(p=>p.location===el.dataset.regionCount).length+' mặt bằng minh họa';
$('#copyright-year').textContent=new Date().getFullYear();
syncControls();render();updateSavedCount();
const deepLink=location.hash.match(/^#mat-bang-(HB-\d{3})$/);if(deepLink)showDetail(deepLink[1]);
window.addEventListener('hashchange',()=>{const match=location.hash.match(/^#mat-bang-(HB-\d{3})$/);if(match)showDetail(match[1]);});
