export const Notification = [
    ////////////////////////////////TẠO PHIẾU//////////////////////////////////
    { field: 'MissingInfo', label: "Bạn vui lòng điền đầy đủ thông tin" },
    { field: 'InvalidProductionDate', label: "Bạn vui lòng điền lại ngày sản xuất không thể lớn hơn ngày hiện tại" },
    { field: 'ConfirmCreateOrder', label: "Bạn có chắc muốn tạo đơn này" },
    { field: 'CreateSuccess', label: "Tạo phiếu nhập thành công" },
    { field: 'CreateFail', label: "Tạo phiếu thất bại! Vui lòng thử lại" },
    ////////////////////////////////UPDATE PHIẾU//////////////////////////////////
    { field: 'UpdateStatusSuccess', label: "Bạn đã cập nhật trạng thái thành công" },
    { field: 'ApprovalError', label: "Đã xảy ra lỗi duyệt phiếu! Vui lòng thử lại." },
    { field: 'ConfirmApproval', label: "Bạn có muốn duyệt task này" },
    { field: 'ConfirmRejection', label: "Bạn có chắc từ chối task này" },
    ///////////////////////////////////Login/////////////////////////////////////
    { field: 'EmployeeNotFound', label: "Không tồn tại tài khoản nhân viên này" },
    { field: 'LoginNotFound', label: "Không tồn tại tài khoản này" },
    { field: 'CustomerNotFound', label: "Không tồn tại tài khoản khách hàng này" },
    { field: 'MissingLoginInfo', label: "Vui lòng điền đầy đủ Username và Password" },
    { field: 'SelectAccountType', label: "Vui lòng chọn loại tài khoản đăng nhập" },
    { field: 'TokenTimeLifeNotice', label: "Thời hạn đăng nhập đã hết vui lòng đăng nhập lại" },
    ]

export const Title =[
    {field:'Warning',label:"Cảnh báo"},
    {field:'Notice',label:"Thông báo"},
    {field:'Create',label:"Tạo phiếu"},
]