```js
// BlackTea POS v8 final - full logic with popup chọn bàn, payment preview, discount, history filter

const KEY_MENU = 'BT8_MENU';
const KEY_CATS = 'BT8_CATS';
const KEY_TABLES = 'BT8_TABLES';
const KEY_HISTORY = 'BT8_HISTORY';
const KEY_GUEST = 'BT8_GUEST_CNT';

let MENU = JSON.parse(localStorage.getItem(KEY_MENU)) || [
  { id: 1, name: "Cà phê máy (nguyên chất)", price: 15000, cat: "Cà phê" },
  { id: 2, name: "Cà phê phin (đen/sữa)", price: 15000, cat: "Cà phê" },
  { id: 3, name: "Cà phê sữa gòn", price: 20000, cat: "Cà phê" },
  { id: 4, name: "Bạc xỉu", price: 20000, cat: "Cà phê" },
  { id: 5, name: "Cà phê kem trứng", price: 20000, cat: "Cà phê" },
  { id: 6, name: "Cà phê cốt dừa", price: 20000, cat: "Cà phê" },
  { id: 7, name: "Cacao nóng", price: 20000, cat: "Cà phê" },
  { id: 8, name: "Cacao đá", price: 20000, cat: "Cà phê" },

  { id: 9, name: "Trà sữa truyền thống (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 10, name: "Trà sữa truyền thống (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 11, name: "Trà sữa khoai môn (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 12, name: "Trà sữa khoai môn (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 13, name: "Trà sữa socola (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 14, name: "Trà sữa socola (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 15, name: "Chân châu đường đen (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 16, name: "Chân châu đường đen (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 17, name: "Trà đào (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 18, name: "Trà đào (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 19, name: "Trà đào cam sả (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 20, name: "Trà đào cam sả (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 21, name: "Trà vải (Size M)", price: 15000, cat: "Trà sữa" },
  { id: 22, name: "Trà vải (Size L)", price: 20000, cat: "Trà sữa" },
  { id: 23, name: "Trà gừng (Size M)", price: 15000, cat: "Trà sữa" },
  { id: 24, name: "Trà gừng (Size L)", price: 20000, cat: "Trà sữa" },
  { id: 25, name: "Trà lipton ngũ sắc (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 26, name: "Trà lipton ngũ sắc (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 27, name: "Trà thảo mộc (Size M)", price: 20000, cat: "Trà sữa" },
  { id: 28, name: "Trà thảo mộc (Size L)", price: 25000, cat: "Trà sữa" },
  { id: 29, name: "Trà tắc sỉ muối", price: 15000, cat: "Trà sữa" },

  { id: 30, name: "Sinh tố Dứa", price: 25000, cat: "Sinh tố" },
  { id: 31, name: "Sinh tố Dâu", price: 25000, cat: "Sinh tố" },
  { id: 32, name: "Sinh tố Nho", price: 25000, cat: "Sinh tố" },
  { id: 33, name: "Sinh tố Kiwi", price: 25000, cat: "Sinh tố" },
  { id: 34, name: "Sinh tố Việt quất", price: 25000, cat: "Sinh tố" },
  { id: 35, name: "Sinh tố Xoài", price: 25000, cat: "Sinh tố" },

  { id: 36, name: "Sữa chua thuần khiết", price: 20000, cat: "Sữa chua" },
  { id: 37, name: "Sữa chua Việt quất", price: 25000, cat: "Sữa chua" },
  { id: 38, name: "Sữa chua Nho", price: 25000, cat: "Sữa chua" },
  { id: 39, name: "Sữa chua Dâu", price: 25000, cat: "Sữa chua" },
  { id: 40, name: "Sữa chua Kiwi", price: 25000, cat: "Sữa chua" },
  { id: 41, name: "Sữa chua Xoài", price: 25000, cat: "Sữa chua" },

  { id: 42, name: "Bò húc", price: 18000, cat: "Giải khát" },
  { id: 43, name: "Nước các loại", price: 15000, cat: "Giải khát" },
  { id: 44, name: "Soda gum", price: 25000, cat: "Giải khát" },
  { id: 45, name: "Cocktail", price: 15000, cat: "Giải khát" },

  { id: 46, name: "Thêm topping", price: 5000, cat: "Topping" },
  { id: 47, name: "Kem cheese", price: 5000, cat: "Topping" },
  { id: 48, name: "Trứng nướng", price: 5000, cat: "Topping" },
  { id: 49, name: "Kem lăng", price: 5000, cat: "Topping" },
  { id: 50, name: "Kem lăng dừa", price: 15000, cat: "Topping" }
];

let CATEGORIES = JSON.parse(localStorage.getItem(KEY_CATS)) || 
  ["Tất cả","Cà phê","Trà sữa","Sinh tố","Sữa chua","Giải khát","Topping"];
let TABLES = JSON.parse(localStorage.getItem(KEY_TABLES)) || [];
let HISTORY = JSON.parse(localStorage.getItem(KEY_HISTORY)) || [];
let GUEST_CNT = parseInt(localStorage.getItem(KEY_GUEST) || '0');

let currentTable = null;
let createdFromMain = false;
let activeCategory = 'Tất cả';

// helpers
function $(id){ return document.getElementById(id); }
function fmtV(n){ return n.toLocaleString('vi-VN'); }
function nowStr(){ return new Date().toLocaleString('vi-VN'); }
function isoDateKey(t){ const d = new Date(t); const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0'); return y+'-'+m+'-'+day; }
function displayDateFromISO(iso){ const parts = iso.split('-'); return parts[2] + '/' + parts[1] + '/' + parts[0]; }
function saveAll(){ 
  localStorage.setItem(KEY_MENU, JSON.stringify(MENU)); 
  localStorage.setItem(KEY_CATS, JSON.stringify(CATEGORIES)); 
  localStorage.setItem(KEY_TABLES, JSON.stringify(TABLES)); 
  localStorage.setItem(KEY_HISTORY, JSON.stringify(HISTORY)); 
  localStorage.setItem(KEY_GUEST, String(GUEST_CNT)); 
}

// ... (các hàm renderTables, openTable, renderMenuList, renderCart, thanh toán, history giữ nguyên như bạn đang có)

// init
window.addEventListener('load', ()=>{
  if($('guest-btn')) $('guest-btn').addEventListener('click', addGuest);
  if($('add-table-btn')) $('add-table-btn').addEventListener('click', addNamed);
  if($('cancel-order-btn')) $('cancel-order-btn').addEventListener('click', cancelOrder);
  if($('save-btn')) $('save-btn').addEventListener('click', saveOrder);
  if($('addmore-btn')) $('addmore-btn').addEventListener('click', addMore);
  if($('pay-btn')) $('pay-btn').addEventListener('click', payTable);
  if($('history-date')) $('history-date').addEventListener('change', ()=> renderHistory());
  const brand = document.getElementById('brand'); 
  if(brand) brand.addEventListener('click', ()=> backToTables());

  // ===== Popup chọn bàn =====
  let selectedTableName = null;

  if($('dinein-btn')) $('dinein-btn').addEventListener('click', ()=>{
    $('table-popup').style.display = 'flex';
    selectedTableName = null;
  });

  document.querySelectorAll('.table-choice').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.table-choice').forEach(b=> b.classList.remove('btn-primary'));
      btn.classList.add('btn-primary');
      selectedTableName = btn.innerText;
    });
  });

  if($('cancel-table')) $('cancel-table').addEventListener('click', ()=>{
    $('table-popup').style.display = 'none';
  });

  if($('confirm-table')) $('confirm-table').addEventListener('click', ()=>{
    if(!selectedTableName) return;
    const id = Date.now();
    TABLES.push({ id, name: selectedTableName, cart: [] });
    saveAll();
    $('table-popup').style.display = 'none';
    createdFromMain = true;
    openTable(id);
  });

  // chuyển tầng
  if($('ground-btn')) $('ground-btn').addEventListener('click', ()=>{
    $('ground-floor').style.display = 'block';
    $('upstairs-floor').style.display = 'none';
  });
  if($('upstairs-btn')) $('upstairs-btn').addEventListener('click', ()=>{
    $('ground-floor').style.display = 'none';
    $('upstairs-floor').style.display = 'block';
  });

  renderTables(); 
  renderCategories(); 
  populateCatSelect(); 
  renderMenuSettings(); 
  saveAll();
});
```
