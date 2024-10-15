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
                this.set_name("pivot");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1002,670);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_pivot", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEOGYRY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_YEAR\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_MONTH\" type=\"STRING\" size=\"256\"/><Column id=\"ORDER_COUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_yearMonth", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_grdPivot", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_cond", this);
            obj._setContents("<ColumnInfo><Column id=\"sendCategory\" type=\"STRING\" size=\"256\"/><Column id=\"sendProduct\" type=\"STRING\" size=\"256\"/><Column id=\"sendFrom\" type=\"STRING\" size=\"256\"/><Column id=\"sendTo\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_category", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Grid("grd_pivot", "absolute", "20", "83", null, null, "20", "20", this);
            obj.set_taborder("0");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_pivot");
            obj._setContents("<Formats><Format id=\"default\"></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "20", "14", "292", "28", null, null, this);
            obj.set_taborder("1");
            obj.set_text("▣ 카테고리별 주문 목록");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", null, "16", "321", "30", "20", null, this);
            obj.set_taborder("2");
            obj.set_text("Div00");
            obj.style.set_border("1 none #808080");
            this.addChild(obj.name, obj);
            obj = new Button("btn_search", "absolute", null, "2", "60", "24", "62", null, this.Div00);
            obj.set_taborder("0");
            obj.set_text("조회");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_cursor("hand");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("btn_excel", "absolute", null, "2", "60", "24", "0", null, this.Div00);
            obj.set_taborder("1");
            obj.set_text("엑셀");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_cursor("hand");
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "20", "44", null, "37", "20", null, this);
            obj.set_taborder("3");
            obj.set_text("Div01");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "22", "8", "69", "20", null, null, this.Div01);
            obj.set_taborder("0");
            obj.set_text("카테고리");
            obj.style.set_align("right middle");
            this.Div01.addChild(obj.name, obj);
            obj = new Combo("cbo_category", "absolute", "96", "8", "142", "20", null, null, this.Div01);
            this.Div01.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_text("- 선택 -");
            obj.set_innerdataset("@ds_category");
            obj.set_codecolumn("CATEGORY_ID");
            obj.set_datacolumn("CATEGORY_NAME");
            obj = new Static("st_name", "absolute", "258", "8", "90", "20", null, null, this.Div01);
            obj.set_taborder("2");
            obj.set_text("상품 명");
            obj.style.set_align("right middle");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "532", "8", "90", "20", null, null, this.Div01);
            obj.set_taborder("3");
            obj.set_text("주문일");
            obj.style.set_align("right middle");
            this.Div01.addChild(obj.name, obj);
            obj = new Calendar("cal_from", "absolute", "627", "8", "117", "20", null, null, this.Div01);
            this.Div01.addChild(obj.name, obj);
            obj.set_taborder("5");
            obj = new Calendar("cal_to", "absolute", "786", "8", "115", "20", null, null, this.Div01);
            this.Div01.addChild(obj.name, obj);
            obj.set_taborder("6");
            obj = new Static("Static03", "absolute", "749", "8", "32", "20", null, null, this.Div01);
            obj.set_taborder("7");
            obj.set_text("-");
            obj.style.set_align("center middle");
            this.Div01.addChild(obj.name, obj);
            obj = new Edit("edt_name", "absolute", "353", "8", "159", "20", null, null, this.Div01);
            obj.set_taborder("8");
            this.Div01.addChild(obj.name, obj);

            obj = new Button("btn_menu", "absolute", "270", "20", "80", "20", null, null, this);
            obj.set_taborder("4");
            obj.set_text("MENULIST");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 321, 30, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.set_text("Div00");
            		p.style.set_border("1 none #808080");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 37, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_text("Div01");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1002, 670, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","Div01.cbo_category","value","ds_cond","sendCategory");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","Div01.edt_name","value","ds_cond","sendProduct");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","Div01.cal_from","value","ds_cond","sendFrom");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","Div01.cal_to","value","ds_cond","sendTo");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("pivot.xfdl", function(exports) {
        /*
        화면명 : 카테고리별 주문 목록 피벗
        작성자 : 김진한
        작성일자 : 2024/09/23
        */

        
        /***************************************************
        * 함수명 : pivot_onload 
        * 내  용 : 로드 함수
        ****************************************************/
        this.pivot_onload = function(obj,e)
        {
        	this.fn_loadCategoryInfo();
        }

        /***************************************************
        * 함수명 : fn_loadCategoryInfo 
        * 내  용 : 로드 트랜잭션 호출
        ****************************************************/
        this.fn_loadCategoryInfo = function(){
        	var strSvcId = "fn_loadCategoryInfo";
        	var strSvcUrl = "http://localhost:8080/loadCategoryInfo";
        	var inData = ""
        	var outData = "ds_category=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_loadCategoryInfo";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_loadCategoryInfo 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_loadCategoryInfo = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        	var existingCategory = this.ds_category.getColumn(0, "CATEGORY_NAME");
        	
        	if (existingCategory !== "- 전체 -") {
                    var newRow = this.ds_category.insertRow(0);
                    this.ds_category.setColumn(newRow, "CATEGORY_ID", "");
                    this.ds_category.setColumn(newRow, "CATEGORY_NAME", "- 전체 -");
                }
        	}
        	this.Div01.cbo_category.set_index(0);
        }

        

        
        /***************************************************
        * 함수명 : Div00_btn_search_onclick 
        * 내  용 : 조회 클릭 
        ****************************************************/
        this.Div00_btn_search_onclick = function(obj,e)
        {	
        	this.fn_checkVal();
        }

        /***************************************************
        * 함수명 : fn_checkVal 
        * 내  용 : 조회 유효성 검사
        ****************************************************/
        this.fn_checkVal = function(){
        	var fromDate = this.ds_cond.getColumn(0, "sendFrom");
        	var toDate = this.ds_cond.getColumn(0, "sendTo");
        	
        	if(fromDate < 19000000) {
        		alert("1900년도 이후로 입력이 가능합니다.");
        		return;
        	}
        	
        	if(toDate < 19000000) {
        		alert("1900년도 이후로 입력이 가능합니다.");
        		return;
        	}
        	
        	if(toDate-fromDate < 0) {
        		alert("시작 날짜가 종료 날짜보다 같거나 더 늦습니다. 올바른 날짜 범위를 입력해 주세요.");
        		return;
        	}
        	
        	this.fn_loadProductByCategory();
        }

        /***************************************************
        * 함수명 : fn_loadProductByCategory 
        * 내  용 : 조회 트랜잭션 호출
        ****************************************************/
        this.fn_loadProductByCategory = function(){
        	var strSvcId = "loadProductByCategoryPivot";
        	var strSvcUrl = "http://localhost:8080/loadProductByCategoryPivot";
        	var inData = "inDataset=ds_cond"
        	var outData = "ds_pivot=outDataset, ds_yearMonth=outDataset2";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_loadProductByCategoryPivot";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_loadProductByCategoryPivot 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_loadProductByCategoryPivot = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		this.fn_render();
        	}
        }

        /***************************************************
        * 함수명 : fn_render 
        * 내  용 : 그리드 랜더 함수
        ****************************************************/
        this.fn_render = function(){
        	// 고유년도 저장할 객체
        	var yearMonths = {};
        	
        	this.grd_pivot.setBindDataset("ds_pivot");
        	
        	var v_Formats = "";
        	var v_Columns = "";
        	var v_Rows = "";
        	var v_BandHead = "";
        	var v_BandBody = "";
        	
        	//:::::::::::컬럼 설정::::::::::://
        	v_Columns += '<Column size="120" />\n';
        	v_Columns += '<Column size="250" />\n';
        	
        	// 월 수 만큼 컬럼행 추가하면서 년도 저장(중복값제외).
        	for(var i=0; i<this.ds_yearMonth.getRowCount(); i++){
        		v_Columns +=  '<Column size="45" />\n';
        		var year = this.ds_yearMonth.getColumn(i, "YEAR");
        		var month = this.ds_yearMonth.getColumn(i, "MONTH");
        		
        		this.ds_pivot.addColumn(year + "-" + month, "STRING");
        		
        		 // 연도 객체가 없으면 초기화
        		if (!yearMonths[year]) {
        			yearMonths[year] = []; // 배열을 사용하여 월 저장
        		}
        		
        		// 배열에 월이 없으면 추가 (중복 제거)
        		if (yearMonths[year].indexOf(month) === -1) {
        			yearMonths[year].push(month);
        		}
        	}
        	
        	// 연도별 월 수로 변환
        	var yearDataCount = Object.keys(yearMonths).length;
        	

        	//:::::::::::행 설정::::::::::://

        	v_Rows += '<Row size="23" band="head" />\n';
        	v_Rows += '<Row size="23" band="head" />\n';
         	v_Rows += '<Row size="23"/>\n';
        	
        	//:::::::::::헤더 밴드 영역::::::::::://
        	var colNum = 2;
        	v_BandHead += '<Cell colspan="2"/>\n';
        	
        	// 년도별 셀 추가
        	for (var year in yearMonths) {
        		if (yearMonths.hasOwnProperty(year)) {
        			var colspan = yearMonths[year].length; // 해당 년도의 고유한 월 수
        			
        			// 년도 셀 추가
        			v_BandHead += '<Cell col="' + colNum + '" colspan="' + colspan + '" text="' + year + '년"/>\n';
        			
        			// 다음 컬럼 번호 계산 (현재 컬럼 번호에 해당 월 수 추가)
        			colNum += colspan;
        		}
        		
        	}

        	v_BandHead += '<Cell row="1" text="카테고리 명"/>\n';
        	v_BandHead += '<Cell row="1" col="1" text="상품 명"/>\n';
        	
        	//바디밴드
        	v_BandBody += '<Cell text="bind:CATEGORY_NAME"/>\n';
        	v_BandBody += '<Cell col="1" text="bind:PRODUCT_NAME" style="align:left; padding:3;"/>\n';
        	
        	var yearMonthMap = {};
        	var monthCol = 2;
        	for (i=0; i<this.ds_yearMonth.getRowCount(); i++){
        		var monthData = this.ds_yearMonth.getColumn(i, "MONTH");
        		var yearData = this.ds_yearMonth.getColumn(i, "YEAR");
        		var key = yearData + "-" + monthData;
        		yearMonthMap[key] = monthCol;
        		
        		v_BandHead += '<Cell row="1" col="' + monthCol + '" text="' + monthData + '월"/>\n';
        		v_BandBody += '<Cell col="' + monthCol + '" text="bind:' + yearData + '-' + monthData + '"/>\n';
        	
        		monthCol++;
        	}
        		
        	for(i=0; i<this.ds_pivot.getRowCount(); i++){
        		var orderYear = this.ds_pivot.getColumn(i, "ORDER_YEAR");
        		var orderMonth = this.ds_pivot.getColumn(i, "ORDER_MONTH");
        		var orderCount = this.ds_pivot.getColumn(i, "ORDER_COUNT");
        		
        		this.ds_pivot.setColumn(i, orderYear + "-" + orderMonth, orderCount);
        	}

        	//최종 포맷 설정
        	v_Formats = '<Formats>\n';
        	v_Formats += '<Format id="default">\n';
        	v_Formats += '<Columns>\n' + v_Columns + '</Columns>\n';
        	v_Formats += '<Rows>\n' + v_Rows + '</Rows>\n';
        	v_Formats += '<Band id="head">\n' + v_BandHead + '</Band>\n';
        	v_Formats += '<Band id="body">\n' + v_BandBody + '</Band>\n';
        	v_Formats += '</Format>\n';
        	v_Formats += '</Formats>\n';
        	
        	this.grd_pivot.set_enableredraw(false);
        	this.grd_pivot.set_formats(v_Formats);
        	this.grd_pivot.set_enableredraw(true);
        	
        }

        /***************************************************
        * 함수명 : common_onkeydown 
        * 내  용 : 엔터 키 입력 함수(조회)
        ****************************************************/
        this.common_onkeydown = function(obj,e)
        {
        	if (e.keycode == 13) {  //엔터키 keycode
        		obj.updateToDataset();
                this.Div00_btn_search_onclick();  
            }
        }

        /***************************************************
        * 함수명 : btn_menu_onclick 
        * 내  용 : 테스트용 메뉴 버튼
        ****************************************************/
        this.btn_menu_onclick = function(obj,e)
        {
            // 이동할 URL 설정
            var url = "http://localhost:8080/TestProject/index.html";

            // 또는, 현재 탭에서 열기
            window.location.href = url; // 현재 탭에서 열기
        }

        this.Div00_btn_excel_onclick = function(obj,e)
        {
        	var arrayTemp = [1,3,2,5,4,10,8,9,7,6]
        	trace(NaN === NaN);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.pivot_onload, this);
            this.addEventHandler("onkeydown", this.pivot_onkeydown, this);
            this.grd_pivot.addEventHandler("oncellclick", this.grd_pivot_oncellclick, this);
            this.Div00.btn_search.addEventHandler("onclick", this.Div00_btn_search_onclick, this);
            this.Div00.btn_excel.addEventHandler("onclick", this.Div00_btn_excel_onclick, this);
            this.Div01.cbo_category.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.Div01.cal_from.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.Div01.cal_to.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.Div01.edt_name.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.btn_menu.addEventHandler("onclick", this.btn_menu_onclick, this);

        };

        this.loadIncludeScript("pivot.xfdl", true);

       
    };
}
)();
