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
                this.set_name("orderlist");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1002,670);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_category", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_product", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_order_ct", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_order_pt", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"CUM_QUANTITY\" type=\"STRING\" size=\"256\"/><Column id=\"CUM_PRICE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_title", "absolute", "20", "20", "325", "22", null, null, this);
            obj.set_taborder("0");
            obj.set_text("▣ 카테고리별 주문목록 현황");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Button("btn_reset", "absolute", null, "20", "30", "27", "20", null, this);
            obj.set_taborder("1");
            obj.style.set_image("URL('theme://hiclipart.com (1).png')");
            obj.style.set_background("#4f81bdff");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_category", "absolute", "20", "52", "323", null, null, "20", this);
            obj.set_taborder("2");
            obj.set_binddataset("ds_order_ct");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"184\"/><Column size=\"134\"/></Columns><Rows><Row size=\"28\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"카테고리 명\"/><Cell col=\"1\" text=\"상품 수\"/></Band><Band id=\"body\"><Cell style=\"align:left;padding:0 0 0 3;\" text=\"bind:CATEGORY_NAME\"/><Cell col=\"1\" style=\"align:right;padding:0 3 0 0;\" text=\"bind:COUNT\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01", "absolute", "352", "52", null, null, "20", "20", this);
            obj.set_taborder("3");
            obj.set_binddataset("ds_order_pt");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"267\"/><Column size=\"92\"/><Column size=\"119\"/><Column size=\"152\"/></Columns><Rows><Row size=\"28\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"상품명\"/><Cell col=\"1\" text=\"상품 개수\"/><Cell col=\"2\" text=\"누적주문수량\"/><Cell col=\"3\" text=\"누적 주문가격\"/></Band><Band id=\"body\"><Cell style=\"align:left;padding:0 0 0 3;\" text=\"bind:PRODUCT_NAME\"/><Cell col=\"1\" displaytype=\"number\" style=\"align:right;padding:0 2 0 0;\" text=\"bind:AMOUNT\" mask=\"!999,999,999\"/><Cell col=\"2\" displaytype=\"number\" style=\"align:right;padding:0 2 0 0;\" text=\"bind:CUM_QUANTITY\" mask=\"!999,999,999\"/><Cell col=\"3\" displaytype=\"number\" style=\"align:right;padding:0 2 0 0;\" text=\"bind:CUM_PRICE\" mask=\"!999,999,999\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "317", "24", "80", "20", null, null, this);
            obj.set_taborder("4");
            obj.set_text("MENULIST");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1002, 670, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("orderlist.xfdl", function(exports) {
        /*
        화면명 : 재고 등록 팝업 
        작성자 : 김진한
        작성일자 : 2024/09/11
        */

        
        /***************************************************
        * 함수명 : orderlist_onload 
        * 내  용 : 카테고리별 상품 수 가져오기
        ****************************************************/
        this.orderlist_onload = function(obj,e)
        {
        	this.fn_loadProductByCategory();
        }

        /***************************************************
        * 함수명 : fn_loadProductByCategory 
        * 내  용 : 로드 트랜잭션 호출
        ****************************************************/
        this.fn_loadProductByCategory = function(){
        	var strSvcId = "loadProductByCategory";
        	var strSvcUrl = "http://localhost:8080/loadProductByCategory";
        	var inData = ""
        	var outData = "ds_order_ct=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_loadProductByCategory";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_loadProductByCategory 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_loadProductByCategory = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		var selectedRow = this.ds_order_ct.rowposition;
        		this.ds_category.addRow();
        		this.ds_category.copyRow(0, this.ds_order_ct, selectedRow);
        		
        		this.fn_loadProductList();
        	}
        }

        
        /***************************************************
        * 함수명 : grd_category_oncellclick 
        * 내  용 : 카테고리 셀 클릭시 모든 제품 리스트 가져오기
        ****************************************************/
        this.grd_category_oncellclick = function(obj,e)
        {
        	// 선택한 행의 데이터 새로운 셋에 담기
         	var selectedRow = this.ds_order_ct.rowposition;
         	this.ds_category.addRow();
         	this.ds_category.copyRow(0, this.ds_order_ct, selectedRow);
         	
        	this.fn_loadProductList();
        }

        /***************************************************
        * 함수명 : fn_loadProductList 
        * 내  용 : 로드 트랜잭션 호출
        ****************************************************/
        this.fn_loadProductList = function(){
        	var strSvcId = "loadProductList";
        	var strSvcUrl = "http://localhost:8080/loadProductList";
        	var inData = "inDataset=ds_category"
        	var outData = "ds_order_pt=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_loadProductList";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_loadProductList 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_loadProductList = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		trace(strSvcId);
        	}
        }

        
        /***************************************************
        * 함수명 : btn_reset_onclick 
        * 내  용 : 주문 목록 데이터 초기화
        ****************************************************/
        this.btn_reset_onclick = function(obj,e)
        {
        	this.ds_order_pt.clearData();
        	var selectedRow = this.ds_order_ct.rowposition;
        	this.grd_category.selectRow(selectedRow, false);
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
            this.addEventHandler("onload", this.orderlist_onload, this);
            this.btn_reset.addEventHandler("onclick", this.btn_reset_onclick, this);
            this.grd_category.addEventHandler("oncellclick", this.grd_category_oncellclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);

        };

        this.loadIncludeScript("orderlist.xfdl", true);

       
    };
}
)();
