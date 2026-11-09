import test from 'node:test';
import assert from 'node:assert/strict';
import {properties,filterProperties,isValidPhone} from '../catalog.js';
test('All demo properties have unique IDs and expected deal types',()=>{
  assert.equal(new Set(properties.map(p=>p.id)).size,properties.length);
  assert.equal(filterProperties({deal:'rent'}).length,8);
  assert.equal(filterProperties({deal:'sale'}).length,4);
});
test('Filters combine location, property type, area and price',()=>{
  assert.deepEqual(filterProperties({deal:'rent',type:'factory',location:'bim-son',area:'medium',price:'high'}).map(p=>p.id),['HB-003']);
  assert.equal(filterProperties({deal:'rent',type:'land',location:'le-mon'}).length,0);
  assert.deepEqual(filterProperties({deal:'sale',price:'sale-low',sort:'price-asc'}).map(p=>p.id),['HB-011','HB-009']);
});
test('Area buckets do not overlap or omit any properties',()=>{
  const found=['small','medium','large'].flatMap(area=>filterProperties({deal:'all',area}));
  assert.equal(found.length,properties.length);
  assert.equal(new Set(found.map(p=>p.id)).size,properties.length);
});
test('Sort respects numerical unit price and area',()=>{
  for(const sort of ['price-asc','price-desc','area-desc']){
    const found=filterProperties({deal:'rent',sort});
    for(let i=1;i<found.length;i++)assert.ok(sort==='price-asc'?found[i-1].price<=found[i].price:sort==='price-desc'?found[i-1].price>=found[i].price:found[i-1].area>=found[i].area);
  }
});
test('Phone validation accepts VN mobile formats, rejects incomplete or invalid input',()=>{
  for(const phone of ['0912 345 678','+84 912 345 678','84912345678','0381234567'])assert.equal(isValidPhone(phone),true,phone);
  for(const phone of ['','1234','0123456789','091234567890','<script>','+1 912345678'])assert.equal(isValidPhone(phone),false,phone);
});
