export const locations = {
  'le-mon': 'KCN Lễ Môn', 'hoang-long': 'KCN Hoàng Long', 'bim-son': 'KCN Bỉm Sơn',
  'nghi-son': 'KKT Nghi Sơn', 'ngoai-kcn': 'Ngoài KCN',
};
export const types = {factory:'Nhà xưởng',warehouse:'Kho lưu trữ',land:'Đất công nghiệp'};
// All records, specifications, prices and photography are illustrative demo content.
export const properties = [
  {id:'HB-001',title:'Nhà xưởng hiện đại tại KCN Lễ Môn',location:'le-mon',type:'factory',deal:'rent',area:5000,price:65000,height:'9 – 12 m',power:'560 kVA',image:'empty-warehouse.jpg',featured:true,tags:['Trong KCN','Sân container','Văn phòng phụ trợ'],description:'Phương án nhà xưởng minh họa với không gian sản xuất thông thoáng, sân bãi và khu văn phòng phụ trợ. Phù hợp để trao đổi nhu cầu sản xuất, lắp ráp hoặc lưu trữ hàng hóa.'},
  {id:'HB-002',title:'Kho logistics kết nối KKT Nghi Sơn',location:'nghi-son',type:'warehouse',deal:'rent',area:3200,price:55000,height:'8 – 10 m',power:'400 kVA',image:'warehouse.jpg',featured:true,tags:['Trong khu kinh tế','Kho vận','Sân xe tải'],description:'Mô hình kho lưu trữ phục vụ bài toán vận hành logistics. Có thể trao đổi thêm nhu cầu về tải trọng sàn, cửa xuất nhập hàng và phương án khai thác.'},
  {id:'HB-003',title:'Nhà xưởng sản xuất tại KCN Bỉm Sơn',location:'bim-son',type:'factory',deal:'rent',area:8000,price:60000,height:'10 – 13 m',power:'1.000 kVA',image:'empty-factory.jpg',featured:false,tags:['Trong KCN','Diện tích lớn','Đường nội khu'],description:'Phương án nhà xưởng diện tích lớn dành cho doanh nghiệp tìm không gian mở rộng sản xuất. Thông số hạ tầng, điều kiện ngành nghề và hồ sơ cần được đối chiếu trước khi giao dịch.'},
  {id:'HB-004',title:'Đất công nghiệp tại KCN Hoàng Long',location:'hoang-long',type:'land',deal:'rent',area:15000,price:42000,height:'Theo thiết kế',power:'Theo nhu cầu',image:'land.jpg',featured:false,tags:['Trong KCN','Quỹ đất phát triển','Hạ tầng kết nối'],description:'Quỹ đất minh họa cho kế hoạch xây dựng cơ sở sản xuất theo yêu cầu riêng. Thời hạn, mục đích sử dụng và điều kiện phát triển cần được xác nhận trên hồ sơ thực tế.'},
  {id:'HB-005',title:'Kho độc lập, linh hoạt diện tích thuê',location:'ngoai-kcn',type:'warehouse',deal:'rent',area:1800,price:45000,height:'7 – 9 m',power:'250 kVA',image:'hero-warehouse.jpg',featured:false,tags:['Ngoài KCN','Kho độc lập','Tiếp cận xe tải'],description:'Phương án kho ngoài khu công nghiệp cho doanh nghiệp cần diện tích vừa phải và cách vận hành linh hoạt. Đăng ký tư vấn để làm rõ yêu cầu về địa điểm và ngân sách.'},
  {id:'HB-006',title:'Xưởng tiêu chuẩn tại KCN Hoàng Long',location:'hoang-long',type:'factory',deal:'rent',area:4500,price:62000,height:'9 – 11 m',power:'630 kVA',image:'workshop.jpg',featured:false,tags:['Trong KCN','Nhà xưởng độc lập','Văn phòng'],description:'Mặt bằng nhà xưởng minh họa có không gian sản xuất và khu phụ trợ. Habaki tiếp nhận nhu cầu để lựa chọn phương án thích hợp với đặc thù ngành nghề.'},
  {id:'HB-007',title:'Nhà xưởng quy mô lớn tại KCN Bỉm Sơn',location:'bim-son',type:'factory',deal:'rent',area:12000,price:58000,height:'10 – 14 m',power:'1.250 kVA',image:'empty-warehouse.jpg',featured:false,tags:['Trong KCN','Quy mô lớn','Sân bãi rộng'],description:'Phương án diện tích lớn cho nhu cầu tập trung sản xuất và kho vận. Các thông tin về điện, nước, tải trọng và điều kiện bàn giao cần xác nhận trong quá trình khảo sát.'},
  {id:'HB-008',title:'Kho trung chuyển tại khu vực Lễ Môn',location:'le-mon',type:'warehouse',deal:'rent',area:2500,price:50000,height:'8 m',power:'320 kVA',image:'warehouse.jpg',featured:false,tags:['Trong KCN','Kho trung chuyển','Xe tải tiếp cận'],description:'Mô hình kho trung chuyển minh họa, phù hợp cho việc khảo sát phương án phân phối và lưu trữ. Diện tích và ngân sách có thể được điều chỉnh theo nhu cầu trao đổi.'},
  {id:'HB-009',title:'Chuyển nhượng đất tại KCN Bỉm Sơn',location:'bim-son',type:'land',deal:'sale',area:20000,price:1800000,height:'Theo thiết kế',power:'Theo nhu cầu',image:'land.jpg',featured:true,tags:['Trong KCN','Quỹ đất lớn','Chuyển nhượng'],description:'Phương án quỹ đất dành cho doanh nghiệp có kế hoạch đầu tư dài hạn. Giá chuyển nhượng, thời hạn và điều kiện pháp lý đều là thông tin minh họa, cần xác minh với chủ tài sản.'},
  {id:'HB-010',title:'Nhà xưởng chuyển nhượng tại Lễ Môn',location:'le-mon',type:'factory',deal:'sale',area:6000,price:3500000,height:'9 – 12 m',power:'630 kVA',image:'empty-factory.jpg',featured:true,tags:['Trong KCN','Xưởng hiện hữu','Chuyển nhượng'],description:'Mô hình chuyển nhượng nhà xưởng hiện hữu để tham khảo trải nghiệm tìm kiếm. Người mua cần kiểm tra hồ sơ, tài sản gắn liền với đất và điều kiện giao dịch thực tế.'},
  {id:'HB-011',title:'Đất công nghiệp khu vực Nghi Sơn',location:'nghi-son',type:'land',deal:'sale',area:30000,price:1500000,height:'Theo thiết kế',power:'Theo nhu cầu',image:'land.jpg',featured:false,tags:['Trong khu kinh tế','Diện tích lớn','Phát triển dài hạn'],description:'Phương án quỹ đất minh họa dành cho kế hoạch phát triển cơ sở sản xuất. Thông tin quy hoạch, ngành nghề tiếp nhận và hồ sơ cần được thẩm tra trước khi đầu tư.'},
  {id:'HB-012',title:'Kho xưởng độc lập ngoài khu công nghiệp',location:'ngoai-kcn',type:'factory',deal:'sale',area:2800,price:2800000,height:'8 – 10 m',power:'400 kVA',image:'workshop.jpg',featured:false,tags:['Ngoài KCN','Kho xưởng độc lập','Chuyển nhượng'],description:'Phương án kho xưởng độc lập minh họa cho nhu cầu sở hữu mặt bằng. Đăng ký trao đổi để xác định diện tích, vị trí và các tiêu chí pháp lý cần kiểm tra.'},
];

export const number = value => new Intl.NumberFormat('vi-VN').format(value);
export function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();}
export function filterProperties(state){
  const found=properties.filter(p=>{
    if(state.deal&&state.deal!=='all'&&p.deal!==state.deal)return false;
    if(state.type&&state.type!=='all'&&p.type!==state.type)return false;
    if(state.location&&state.location!=='all'&&p.location!==state.location)return false;
    if(state.area==='small'&&p.area>=3000)return false;
    if(state.area==='medium'&&(p.area<3000||p.area>10000))return false;
    if(state.area==='large'&&p.area<=10000)return false;
    if(state.price==='low'&&(p.deal!=='rent'||p.price>=60000))return false;
    if(state.price==='high'&&(p.deal!=='rent'||p.price<60000))return false;
    if(state.price==='sale-low'&&(p.deal!=='sale'||p.price>=2000000))return false;
    if(state.price==='sale-high'&&(p.deal!=='sale'||p.price<2000000))return false;
    return true;
  });
  return found.sort((a,b)=>state.sort==='price-asc'?a.price-b.price:state.sort==='price-desc'?b.price-a.price:state.sort==='area-desc'?b.area-a.area:Number(b.featured)-Number(a.featured));
}
export function isValidPhone(phone){return /^(?:0[35789]\d{8}|\+?84[35789]\d{8})$/.test(phone.replace(/[\s().-]/g,''));}
