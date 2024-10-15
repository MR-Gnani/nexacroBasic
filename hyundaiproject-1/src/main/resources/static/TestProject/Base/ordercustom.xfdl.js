(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("ordercustom");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1002,670);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_orderlist", this);
            obj._setContents("<ColumnInfo><Column id=\"CHECK\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"UNIT_PRICE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_productlist", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"AFTER_AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_user", this);
            obj._setContents("<ColumnInfo><Column id=\"CUSTOMER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/><Column id=\"ADDRESS\" type=\"STRING\" size=\"256\"/><Column id=\"WEBSITE\" type=\"STRING\" size=\"256\"/><Column id=\"CREDIT_LIMIT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_const", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_title", "absolute", "20", "9", "291", "40", null, null, this);
            obj.set_taborder("0");
            obj.set_text("▣ 주문");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Div("div_auth", "absolute", "20", "45", "398", "30", null, null, this);
            obj.set_taborder("3");
            obj.style.set_align("left");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 0 0 20");
            this.addChild(obj.name, obj);
            obj = new Button("btn_Login", "absolute", "223", "4", null, "20", "10", null, this.div_auth);
            obj.set_taborder("2");
            obj.set_text("로그인");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("white");
            obj.style.set_cursor("hand");
            this.div_auth.addChild(obj.name, obj);
            obj = new Button("btn_Logout", "absolute", "223", "4", null, "20", "8", null, this.div_auth);
            obj.set_taborder("3");
            obj.set_text("로그아웃");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("white");
            obj.style.set_cursor("hand");
            this.div_auth.addChild(obj.name, obj);
            obj = new Edit("edt_name", "absolute", "59", "4", "155", "20", null, null, this.div_auth);
            obj.set_taborder("0");
            obj.set_maxlength("80");
            this.div_auth.addChild(obj.name, obj);
            obj = new Static("st_name", "absolute", "3", "4", "51", "20", null, null, this.div_auth);
            obj.set_taborder("1");
            obj.set_text("이름");
            obj.style.set_align("right middle");
            this.div_auth.addChild(obj.name, obj);

            obj = new Static("st_productList", "absolute", "20", "79", "132", "38", null, null, this);
            obj.set_taborder("4");
            obj.set_text("▶상품목록");
            obj.style.set_font("bold 11 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("st_orderList", "absolute", "20", "368", "117", "44", null, null, this);
            obj.set_taborder("5");
            obj.set_text("▶주문목록");
            obj.style.set_font("bold 11 Dotum");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_productList", "absolute", "20", "111", null, "243", "20", null, this);
            obj.set_taborder("6");
            obj.set_binddataset("ds_productlist");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"323\"/><Column size=\"176\"/><Column size=\"146\"/><Column size=\"175\"/><Column size=\"140\"/><Column size=\"0\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"상품명\"/><Cell col=\"1\" text=\"가격\"/><Cell col=\"2\" text=\"수량\"/><Cell col=\"3\" text=\"주문 후 재고\"/><Cell col=\"4\" text=\"주문\"/><Cell col=\"5\" displaytype=\"none\" text=\"상품ID\"/></Band><Band id=\"body\"><Cell edittype=\"none\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:PRODUCT_NAME\"/><Cell col=\"1\" displaytype=\"number\" edittype=\"none\" style=\"align:right;padding:0 3 0 0;\" text=\"bind:PRICE\" mask=\"!999,999,999.##\"/><Cell col=\"2\" displaytype=\"number\" edittype=\"masknumber\" editfilter=\"number\" style=\"align:right;padding:0 3 0 0;\" text=\"bind:AMOUNT\" mask=\"!9,999,999\" editlimit=\"9\" editlimitbymask=\"both\"/><Cell col=\"3\" displaytype=\"number\" edittype=\"none\" style=\"align:right;padding:0 3 0 0;\" text=\"bind:AFTER_AMOUNT\" mask=\"!999,999,999\"/><Cell col=\"4\" displaytype=\"button\" style=\"color:black;color2:black;selectcolor:black;barcolor:black;controlcolor:black;\" text=\"주문하기\"/><Cell col=\"5\" displaytype=\"none\" text=\"bind:PRODUCT_ID\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_orderlist", "absolute", "20", "402", null, null, "20", "20", this);
            obj.set_taborder("7");
            obj.set_binddataset("ds_orderlist");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"447\"/><Column size=\"205\"/><Column size=\"226\"/><Column size=\"0\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" text=\"0\"/><Cell col=\"1\" text=\"상품명\"/><Cell col=\"2\" text=\"수량\"/><Cell col=\"3\" text=\"가격\"/><Cell col=\"4\" displaytype=\"none\" text=\"상품ID\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" text=\"bind:CHECK\"/><Cell col=\"1\" text=\"bind:PRODUCT_NAME\"/><Cell col=\"2\" displaytype=\"number\" edittype=\"masknumber\" editfilter=\"number\" style=\"align:right;padding:0 3 0 0;\" text=\"bind:AMOUNT\" mask=\"!9,999,999\" editlimit=\"9\" editlimitbymask=\"both\"/><Cell col=\"3\" displaytype=\"number\" edittype=\"none\" style=\"align:right;padding:0 3 0 0;\" text=\"bind:PRICE\" mask=\"!999,999,999\"/><Cell col=\"4\" text=\"bind:PRODUCT_ID\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("btn_delete", "absolute", null, "375", "60", "24", "95", null, this);
            obj.set_taborder("8");
            obj.set_text("삭제");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("white");
            obj.style.set_cursor("hand");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Button("btn_order", "absolute", null, "375", "74", "24", "19", null, this);
            obj.set_taborder("9");
            obj.set_text("주문하기");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("white");
            obj.style.set_cursor("hand");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Div("div_top", "absolute", null, "0", "246", "42", "20", null, this);
            obj.set_taborder("10");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Button("btn_reset", "absolute", null, "10", "26", "25", "150", null, this.div_top);
            obj.set_taborder("0");
            obj.style.set_image("URL('theme://hiclipart.com (1).png')");
            obj.style.set_background("#4f81bdff");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_chart", "absolute", null, "10", "148", "25", "0", null, this.div_top);
            obj.set_taborder("1");
            obj.set_text("월단위 주문량 차트");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("white");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "100", "20", "80", "20", null, null, this);
            obj.set_taborder("11");
            obj.set_text("MENULIST");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 398, 30, this.div_auth,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.style.set_align("left");
            		p.style.set_border("1 solid #808080ff");
            		p.style.set_padding("0 0 0 20");

            	}
            );
            this.div_auth.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 246, 42, this.div_top,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("10");
            		p.set_text("Div00");

            	}
            );
            this.div_top.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1002, 670, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","div_auth.edt_name","value","ds_user","NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("ordercustom.xfdl", function(exports) {
        /*
        화면명 : 재고 등록 팝업 
        작성자 : 김진한
        작성일자 : 2024/09/11
        */

        
        loginStatus = false;
        /***************************************************
        * 함수명 : ordercustom_onload 
        * 내  용 : 로드시 로그인/로그아웃 버튼 셋팅
        ****************************************************/
        this.ordercustom_onload = function(obj,e)
        {
        	this.div_auth.btn_Login.set_visible(true);
        	this.div_auth.btn_Logout.set_visible(false);
        }

        
        /***************************************************
        * 함수명 : div_auth_btn_Login_onclick 
        * 내  용 : 로그인 버튼(로그인시 제품 목록 출력)
        ****************************************************/
        this.div_auth_btn_Login_onclick = function(obj,e)
        {	
            if (this.checkVal()) { // validation check
        		alert("아이디를 입력해주세요");
        		return;
        	}
        	this.login();
        }

        /***************************************************
        * 함수명 : login 
        * 내  용 : 로그인 트랜잭션
        ****************************************************/
        this.login = function(){
            var strSvcId = "login";
        	var strSvcUrl = "http://localhost:8080/login";
        	var inData = "inDataset=ds_user"
        	var outData = "ds_user=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fnCallback_login";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fnCallback_login 
        * 내  용 : (콜백)
        ****************************************************/
        this.fnCallback_login = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		alert("로그인 되었습니다.");
        		this.div_auth.edt_name.set_enable(false);
        		this.div_auth.btn_Login.set_visible(false);
        		this.div_auth.btn_Logout.set_visible(true);
        		loginStatus = true
        		this.showAllProductList();
        	} else if(nErrorCode == 1) {
        		alert(strErrorMsg);
        	}
        }

        /***************************************************
        * 함수명 : checkVal 
        * 내  용 : 로그인 시 유효성 체크
        ****************************************************/
        this.checkVal = function() {
        	var name = this.ds_user.getColumn(0, "NAME");
        	var isExist = false;
        	// check
        	if (!name ) {
        		isExist = true;
            }
        	return isExist;
        }

        /***************************************************
        * 함수명 : showAllProductList 
        * 내  용 : 제품 목록 출력 함수
        ****************************************************/
        this.showAllProductList = function(){
        	var strSvcId = "showAllProductList";
        	var strSvcUrl = "http://localhost:8080/showAllProductList";
        	var inData = ""
        	var outData = "ds_productlist=outDataset, ds_const=outDataset2";
        	var strAvg = "";
        	var callBackFnc = "fnCallback_showAllProductList";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fnCallback_showAllProductList 
        * 내  용 : (콜백)
        ****************************************************/
        this.fnCallback_showAllProductList = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		trace(strSvcId);
        	} else if(nErrorCode == 1) {
        		alert(strErrorMsg);
        	}
        }

        
        /***************************************************
        * 함수명 : div_auth_btn_Logout_onclick 
        * 내  용 : 로그아웃 처리
        ****************************************************/
        this.div_auth_btn_Logout_onclick = function(obj,e)
        {	
        	alert("로그아웃 되었습니다.");
        	this.reload();
        	loginStatus = false;
        }

        
        /***************************************************
        * 함수명 : handleEnterKey 
        * 내  용 : 엔터키 입력시 로그인/로그아웃
        ****************************************************/
        this.handleEnterKey = function(obj,e) {
            if (e.keycode == 13) {  // 엔터키 keycode
                if (loginStatus) {
        			this.div_auth_btn_Logout_onclick();
                } else {
        			this.div_auth_btn_Login_onclick();
                }
            }
        }
        this.Div00_edit_name_onkeydown = function(obj,e)
        {	
        	var newName = obj.value;
        	this.ds_user.setColumn(0, "NAME", newName);
        	this.handleEnterKey(obj, e);
        }

        
        /***************************************************
        * 함수명 : grd_productList_oncellclick 
        * 내  용 : 버튼 클릭 함수( 주문 목록에 추가)
        ****************************************************/ 
        this.grd_productList_oncellclick = function(obj,e)
        {
        	var cell = e.cell;
        	
        	var productId = obj.getCellValue(e.row, "5");
        	var productName = obj.getCellValue(e.row, "0");
        	var unitPrice = obj.getCellValue(e.row, "1");
        	var orderAmount = obj.getCellValue(e.row, "2");
        	
        	// 파싱 처리
        	var unitPriceParsed = parseFloat(unitPrice);
        	var orderAmountParsed = parseFloat(orderAmount);
        	
        	//BUTTON만 클릭이 돌아가도록 설정
        	if(cell == 4) {
        		if (orderAmount === undefined || orderAmount === null || orderAmount === "" || parseFloat(orderAmount) <= 0) {
        			alert("수량이 비어있습니다.");
        			return;
        		}
        		
        		// 재고 체크 함수
        		var isInventorySufficient = this.fn_checkInventory(productId, orderAmountParsed);
        		if(!isInventorySufficient){
        			return; // 부족하면 함수 종료
        		}
        		
        		// 주문목록에 상품 추가
        		this.fn_addOrderlist(productId, productName, orderAmountParsed, unitPriceParsed);
        			
        	}
        }

        /***************************************************
        * 함수명 : fn_checkInventory 
        * 내  용 : 재고 체크 함수
        ****************************************************/ 
        this.fn_checkInventory = function(productId,orderAmountParsed){
        	
        	var rowCount = this.ds_productlist.getRowCount();
        	var isInventorySufficient = true; // 재고 플래그
        	
        	for(i=0; i<rowCount; i++){
        		if(this.ds_productlist.getColumn(i, "PRODUCT_ID") == productId){
        			var inventoryAmount = this.ds_productlist.getColumn(i, "AFTER_AMOUNT");
        			var inventoryAmountParsed = parseFloat(inventoryAmount);
        			
        			var inventoryStatus = inventoryAmountParsed - orderAmountParsed
        			
        			if(inventoryStatus<0){ // 재고가 부족할 때
        				alert("남은 재고가 부족합니다.");
        				isInventorySufficient = false;
        			}
        		}
        	}
        	return isInventorySufficient;
        }

        /***************************************************
        * 함수명 : fn_addOrderlist 
        * 내  용 : 주문목록에 상품 추가
        ****************************************************/ 
        this.fn_addOrderlist = function(productId,productName,orderAmountParsed,unitPriceParsed){
        	var rowCount = this.ds_orderlist.getRowCount();
        	var exist = false;
        	
        	// 주문리스트에 동일한 상품이 있는 지 확인
        	for(var i=0; i<rowCount; i++){
        		if(this.ds_orderlist.getColumn(i, "PRODUCT_NAME") == productName) {
        			
        			var beforeAmount = this.ds_orderlist.getColumn(i, "AMOUNT");
        			var beforeAmountParsed = parseFloat(beforeAmount);
        			
        			var totalAmountParsed = beforeAmountParsed + orderAmountParsed;
        			var totalPriceParsed = totalAmountParsed*unitPriceParsed;
        			
        			this.ds_orderlist.setColumn(i, "AMOUNT", totalAmountParsed);
        			this.ds_orderlist.setColumn(i, "PRICE", totalPriceParsed);
        			
        			this.fn_updateInventory(productId, orderAmountParsed);
        			
        			exist = true;
        			break;
        		}
        	}
        	
        	var totalPriceParsed = orderAmountParsed*unitPriceParsed;
        	
        	// 동일한 상품이 없다면 새로 추가
        	if(!exist) {
        		this.ds_orderlist.insertRow(0);
        		this.ds_orderlist.setColumn(0, "CHECK", 0);
        		this.ds_orderlist.setColumn(0, "PRODUCT_NAME", productName);
        		this.ds_orderlist.setColumn(0, "AMOUNT", orderAmountParsed);
        		this.ds_orderlist.setColumn(0, "PRICE", totalPriceParsed); 
        		this.ds_orderlist.setColumn(0, "PRODUCT_ID", productId);
        		this.ds_orderlist.setColumn(0, "UNIT_PRICE", unitPriceParsed);
        		
        		this.fn_updateInventory(productId, orderAmountParsed);
        	}
        }

        /***************************************************
        * 함수명 : fn_updateInventory 
        * 내  용 : 상품목록 재고 업데이트
        ****************************************************/ 
        this.fn_updateInventory = function(productId,orderAmountParsed){
        	var rowCount = this.ds_productlist.getRowCount();
        	
        	for(i=0; i<rowCount; i++){
        		if(this.ds_productlist.getColumn(i, "PRODUCT_ID") == productId){
        			var orderableAmount = this.ds_productlist.getColumn(i, "AFTER_AMOUNT");
        			var afterAmount = orderableAmount - orderAmountParsed;
        			
        			this.ds_productlist.setColumn(i, "AFTER_AMOUNT", afterAmount);
        			break;
        		}
        	}
        }

        
        /***************************************************
        * 함수명 : grd_orderlist_onkillfocus, grd_orderlist_onnodataareaclick, grd_orderlist_onkeyup
        * 내  용 : (아래 3개 함수) 주문 목록에서 수량 수정시 재고 및 가격 업데이트
        ****************************************************/ 
        this.grd_orderlist_onkillfocus = function(obj,e)
        {	
        	this.calInOrderForm(obj);
        }
        this.grd_orderlist_onnodataareaclick = function(obj,e)
        {	
        	this.calInOrderForm(obj);
        }
        this.grd_orderlist_onkeyup = function(obj,e)
        {	
        	if (e.keycode == 13) {  // 엔터키 keycode
        		this.calInOrderForm(obj);
            }
        }

        /***************************************************
        * 함수명 : calInOrderForm
        * 내  용 : 재고 및 가격 업데이트 로직
        ****************************************************/ 
        this.calInOrderForm = function(obj){
        	var row = obj.currentrow;

        	var productId = this.ds_orderlist.getColumn(row, "PRODUCT_ID");
        	var totalAmount = this.ds_orderlist.getColumn(row, "AMOUNT");
        	var unitPrice = this.ds_orderlist.getColumn(row, "UNIT_PRICE");
        	var totalPrice = totalAmount * unitPrice;
        	
        	/*totalPrice = Math.round(totalPrice);*/

        	// 재고 체크 함수
        	var isInventorySufficient = this.fn_checkInventoryInOrderlist(productId, totalAmount, row);
        	if(!isInventorySufficient){
        		return; // 부족하면 함수 종료
        	}
        	
        	this.ds_orderlist.setColumn(row, "PRICE", totalPrice);
        	
        }

        /***************************************************
        * 함수명 : fn_checkInventoryInOrderlist
        * 내  용 : 재고 체크 함수
        ****************************************************/ 
        this.fn_checkInventoryInOrderlist = function(productId,totalAmount,row){
        	var rowCount = this.ds_productlist.getRowCount();
        	var isInventorySufficient = true; // 재고 플래그
        	
        	for(i=0; i<rowCount; i++){
        		if(this.ds_const.getColumn(i, "PRODUCT_ID") == productId){
        			var inventoryAmount = this.ds_const.getColumn(i, "AMOUNT");
        			var orderableAmount = this.ds_productlist.getColumn(i, "AFTER_AMOUNT");
        			
        			var orderableAmountParsed = parseFloat(orderableAmount);
        			var inventoryAmountParsed = parseFloat(inventoryAmount);
        			var previousAmountParsed = inventoryAmountParsed - orderableAmountParsed;
        			
        			var inventoryStatus = inventoryAmountParsed - totalAmount
        			
        			if(inventoryStatus<0){ // 재고가 부족할 때
        				alert("남은 재고가 부족합니다.");
        				this.ds_orderlist.setColumn(row, "AMOUNT", previousAmountParsed);
        				isInventorySufficient = false;
        			} else {
        				this.ds_productlist.setColumn(i, "AFTER_AMOUNT", inventoryStatus);
        			}
        		}
        	}
        	return isInventorySufficient;
        }
        	
        	
        /***************************************************
        * 함수명 : grd_orderlist_onheadclick
        * 내  용 : 전체 체크 값 설정
        ****************************************************/ 
        this.grd_orderlist_onheadclick = function(obj,e)
        {
        	if(e.col == 0) {
        		if(obj.getCellProperty("head", e.col, "text") == 0) {
        			obj.setCellProperty("head", e.col, "text", 1);
        		} else {
        			obj.setCellProperty("head", e.col, "text", 0);
        		}
        		var checkStatus = obj.getCellProperty("head", e.col, "text");
        	}
        	
        	var rowCount = this.ds_orderlist.getRowCount();
        	for (var i = 0; i < rowCount ; i++) {
        		this.ds_orderlist.setColumn(i, "CHECK", checkStatus);
        	}
        }

        
        /***************************************************
        * 함수명 : btn_delete_onclick
        * 내  용 : 주문목록에서 삭제
        ****************************************************/
        this.btn_delete_onclick = function(obj,e)
        {	
        	var rowCount = this.ds_orderlist.getRowCount();
            var rowsToDelete = [];
            var hasCheckedRows = false; // 체크된 행이 있는지 여부를 나타내는 플래그

            // 삭제할 행의 인덱스 수집
            for (var i = 0; i < rowCount; i++) {
                var checkValue = this.ds_orderlist.getColumn(i, "CHECK");
                if (checkValue == 1) {
                    rowsToDelete.push(i);
                    hasCheckedRows = true; // 체크된 행이 있는 경우 플래그 설정
                }
            }
            
            // 체크된 행이 없는 경우
            if (!hasCheckedRows) {
                alert("선택된 값이 없습니다.");
                return;
            } else {
        		// 수집된 인덱스를 기반으로 행 삭제
        		for (var i = rowsToDelete.length - 1; i >= 0; i--) {
        			var rowIndex = rowsToDelete[i];
        			
        			// 삭제할 행의 ID와 수량 가져오기
        			var productId = this.ds_orderlist.getColumn(rowIndex, "PRODUCT_ID");
        			var orderAmount = this.ds_orderlist.getColumn(rowIndex, "AMOUNT");
        			var orderAmountParsed = parseFloat(orderAmount);
        			
        			// ds_productlist에서 해당 상품의 재고 복원
        			var productRowCount = this.ds_productlist.getRowCount();
        			for (var j = 0; j < productRowCount; j++) {
        				if (this.ds_productlist.getColumn(j, "PRODUCT_ID") == productId) {
        					var afterAmount = this.ds_productlist.getColumn(j, "AFTER_AMOUNT");
        					var afterAmountParsed = parseFloat(afterAmount);
        					var updatedAmount = afterAmountParsed + orderAmountParsed; // 수량 복원
        					this.ds_productlist.setColumn(j, "AFTER_AMOUNT", updatedAmount);
        					break; // 해당 상품을 찾았으면 루프 종료
        				}
        			}
        		
        		
        			this.ds_orderlist.deleteRow(rowIndex);
        		}
        		alert("주문 목록이 삭제되었습니다.");
            }
        }

        
        /***************************************************
        * 함수명 : btn_order_onclick
        * 내  용 : 주문버튼 함수
        ****************************************************/ 
        this.btn_order_onclick = function(obj,e)
        {	
        	var validationMessage = this.checkValOnOrder(); 
            if (validationMessage) {
                alert(validationMessage); 
                return; 
            }
            this.order();
        }

        /***************************************************
        * 함수명 : order
        * 내  용 : 주문 트랜잭션
        ****************************************************/ 
        this.order = function(){
            var strSvcId = "order";
        	var strSvcUrl = "http://localhost:8080/order";
        	var inData = "inDataset=ds_user, inDataset2=ds_orderlist"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fnCallback_order";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : btn_order_onclick
        * 내  용 : (콜백)
        ****************************************************/ 
        this.fnCallback_order = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		alert("상품 주문이 완료되었습니다.");
        		this.ds_orderlist.deleteAll();
        		this.showAllProductList();
        	} else if(nErrorCode == 1) {
        		alert(strErrorMsg);
        	}
        }

        /***************************************************
        * 함수명 : checkValOnOrder
        * 내  용 : 체크 유효성 검사
        ****************************************************/ 
        this.checkValOnOrder = function() {
        	var rowCount = this.ds_orderlist.getRowCount();
        	var hasCheckedRows = false;
        	var hasValidAmountRows = false;
        	
            for (var i = 0; i < rowCount; i++) {
                var checkValue = this.ds_orderlist.getColumn(i, "CHECK");
                var amountValue = this.ds_orderlist.getColumn(i, "AMOUNT");
                
                // 체크된 행이 있는지 확인
                if (checkValue == 1) {
                    hasCheckedRows = true;
                    // 체크된 행 중에서 수량이 0이 아닌 경우가 있는지 확인
                    if (amountValue > 0) {
                        hasValidAmountRows = true;
                        break; // 유효한 행을 발견하면 루프 종료
                    }
                }
            }
        	
        	if (!hasCheckedRows) {
                return "선택된 값이 없습니다.";
            } else if (!hasValidAmountRows) {
                return "수량이 0 입니다.";
            }
            
            return null;
        }

        
        /***************************************************
        * 함수명 : div_top_btn_reset_onclick
        * 내  용 : 주문목록 초기화
        ****************************************************/ 
        this.div_top_btn_reset_onclick = function(obj,e)
        {	
        	var rowCount = this.ds_productlist.getRowCount();
        	this.showAllProductList();
        // 	for (var i = 0; i < rowCount; i++) {
        //         this.ds_productlist.setColumn(i, "AMOUNT", null); // 특정 컬럼의 값을 null로 설정
        //     }
        	this.ds_orderlist.clearData();
        }

        

        this.Button00_onclick = function(obj,e)
        {
        	// 이동할 URL 설정
            var url = "http://localhost:8080/TestProject/index.html";

            // 또는, 현재 탭에서 열기
            window.location.href = url; // 현재 탭에서 열기
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.ordercustom_onload, this);
            this.div_auth.btn_Login.addEventHandler("onclick", this.div_auth_btn_Login_onclick, this);
            this.div_auth.btn_Logout.addEventHandler("onclick", this.div_auth_btn_Logout_onclick, this);
            this.div_auth.edt_name.addEventHandler("onchanged", this.Div00_edit_name_onchanged, this);
            this.div_auth.edt_name.addEventHandler("onkeydown", this.Div00_edit_name_onkeydown, this);
            this.grd_productList.addEventHandler("oncellclick", this.grd_productList_oncellclick, this);
            this.grd_orderlist.addEventHandler("ontextchanged", this.Grid01_ontextchanged, this);
            this.grd_orderlist.addEventHandler("ontextchange", this.Grid01_ontextchange, this);
            this.grd_orderlist.addEventHandler("onheadclick", this.grd_orderlist_onheadclick, this);
            this.grd_orderlist.addEventHandler("onkeydown", this.grd_orderlist_onkeydown, this);
            this.grd_orderlist.addEventHandler("onkeyup", this.grd_orderlist_onkeyup, this);
            this.grd_orderlist.addEventHandler("onkillfocus", this.grd_orderlist_onkillfocus, this);
            this.grd_orderlist.addEventHandler("onnodataareaclick", this.grd_orderlist_onnodataareaclick, this);
            this.grd_orderlist.addEventHandler("onsetfocus", this.grd_orderlist_onsetfocus, this);
            this.grd_orderlist.addEventHandler("oncelldblclick", this.grd_orderlist_oncelldblclick, this);
            this.btn_delete.addEventHandler("onclick", this.btn_delete_onclick, this);
            this.btn_order.addEventHandler("onclick", this.btn_order_onclick, this);
            this.div_top.btn_reset.addEventHandler("onclick", this.div_top_btn_reset_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);

        };

        this.loadIncludeScript("ordercustom.xfdl", true);

       
    };
}
)();
