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
                this.set_name("product");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1002,670);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_inv", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REGION\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"DESCRIPTION\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_region", this);
            obj._setContents("<ColumnInfo><Column id=\"REGION_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_country", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNTRY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows/>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_location", this);
            obj._setContents("<ColumnInfo><Column id=\"LOCATION_ID\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_category", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_cond", this);
            obj._setContents("<ColumnInfo><Column id=\"condCategory\" type=\"STRING\" size=\"256\"/><Column id=\"condProduct\" type=\"STRING\" size=\"256\"/><Column id=\"condWarehouse\" type=\"STRING\" size=\"256\"/><Column id=\"condRegion\" type=\"STRING\" size=\"256\"/><Column id=\"condCountry\" type=\"STRING\" size=\"256\"/><Column id=\"condLocation\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"condCountry\"/></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_house", this);
            obj._setContents("<ColumnInfo><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_send_inv", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REGION\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_flag", this);
            obj._setContents("<ColumnInfo><Column id=\"Status\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_title", "absolute", "20", "11", "370", "37", null, null, this);
            obj.set_taborder("0");
            obj.set_text("▣ 재고 목록");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Div("div_top", "absolute", null, "16", "507", "28", "20", null, this);
            obj.set_taborder("1");
            obj.style.set_background("transparent");
            obj.style.set_border("0none solid black");
            this.addChild(obj.name, obj);
            obj = new Button("btn_add", "absolute", null, "2", "60", "24", "0", null, this.div_top);
            obj.set_taborder("0");
            obj.set_text("등록");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid #808080ff");
            obj.style.set_color("white");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_search", "absolute", null, "2", "60", "24", "62", null, this.div_top);
            obj.set_taborder("1");
            obj.set_text("조회");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid #808080ff");
            obj.style.set_color("white");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_reset", "absolute", null, "2", "25", "24", "124", null, this.div_top);
            obj.set_taborder("2");
            obj.style.set_image("URL('theme://hiclipart.com (1).png')");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid #808080ff");
            obj.style.set_color("white");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);

            obj = new Div("div_cond", "absolute", "20", "45", null, "64", "20", null, this);
            obj.set_taborder("2");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_category", "absolute", "4", "8", "80", "20", null, null, this.div_cond);
            obj.set_taborder("0");
            obj.set_text("카테고리");
            obj.style.set_align("right");
            this.div_cond.addChild(obj.name, obj);
            obj = new Combo("cbo_category", "absolute", "89", "8", "183", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_innerdataset("@ds_category");
            obj.set_codecolumn("CATEGORY_ID");
            obj.set_datacolumn("CATEGORY_NAME");
            obj = new Static("st_country", "absolute", "297", "34", "80", null, null, "8", this.div_cond);
            obj.set_taborder("8");
            obj.set_text("국가");
            obj.style.set_align("right");
            this.div_cond.addChild(obj.name, obj);
            obj = new Static("st_location", "absolute", "590", "34", "80", null, null, "8", this.div_cond);
            obj.set_taborder("10");
            obj.set_text("창고위치");
            obj.style.set_align("right");
            this.div_cond.addChild(obj.name, obj);
            obj = new Combo("cbo_location", "absolute", "675", "34", "183", null, null, "8", this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("11");
            obj.set_innerdataset("@ds_location");
            obj.set_codecolumn("LOCATION_ID");
            obj.set_datacolumn("LOCATION_NAME");
            obj.set_index("-1");
            obj = new Static("st_productName", "absolute", "297", "8", "80", "20", null, null, this.div_cond);
            obj.set_taborder("2");
            obj.set_text("상품명");
            obj.style.set_align("right");
            this.div_cond.addChild(obj.name, obj);
            obj = new Edit("edt_productName", "absolute", "382", "8", "183", "20", null, null, this.div_cond);
            obj.set_taborder("3");
            obj.set_maxlength("88");
            this.div_cond.addChild(obj.name, obj);
            obj = new Static("st_houseName", "absolute", "590", "8", "80", "20", null, null, this.div_cond);
            obj.set_taborder("4");
            obj.set_text("창고명");
            obj.style.set_align("right");
            this.div_cond.addChild(obj.name, obj);
            obj = new Edit("edt_houseName", "absolute", "675", "8", "183", "20", null, null, this.div_cond);
            obj.set_taborder("5");
            obj.set_maxlength("88");
            this.div_cond.addChild(obj.name, obj);
            obj = new Static("st_region", "absolute", "4", "34", "80", null, null, "8", this.div_cond);
            obj.set_taborder("6");
            obj.set_text("지역");
            obj.style.set_align("right");
            this.div_cond.addChild(obj.name, obj);
            obj = new Combo("cbo_region", "absolute", "89", "34", "183", null, null, "8", this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("7");
            obj.set_innerdataset("@ds_region");
            obj.set_codecolumn("REGION_ID");
            obj.set_datacolumn("REGION_NAME");
            obj.set_index("-1");
            obj = new Combo("cbo_country", "absolute", "382", "34", "183", null, null, "8", this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("12");
            obj.set_innerdataset("@ds_country");
            obj.set_codecolumn("COUNTRY_ID");
            obj.set_datacolumn("COUNTRY_NAME");
            obj.set_index("-1");

            obj = new Button("btn_category", "absolute", null, "113", "112", "26", "20", null, this);
            obj.set_taborder("3");
            obj.set_text("카테고리관리");
            obj.style.set_background("transparent");
            obj.style.set_border("1 solid #4f81bdff");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Button("btn_allAdd", "absolute", null, "113", "88", "26", "134", null, this);
            obj.set_taborder("4");
            obj.set_text("일괄변경");
            obj.style.set_background("transparent");
            obj.style.set_border("1 solid #4f81bdff");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_inventory", "absolute", "20", "143", null, null, "20", "20", this);
            obj.set_taborder("5");
            obj.set_binddataset("ds_inv");
            obj.set_autofittype("col");
            obj.set_cellsizingtype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"111\"/><Column size=\"201\"/><Column size=\"133\"/><Column size=\"164\"/><Column size=\"176\"/><Column size=\"175\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"카테고리\"/><Cell col=\"1\" text=\"상품명\"/><Cell col=\"2\" text=\"지역\"/><Cell col=\"3\" text=\"국가\"/><Cell col=\"4\" text=\"창고위치\"/><Cell col=\"5\" text=\"창고명\"/></Band><Band id=\"body\"><Cell edittype=\"combo\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:CATEGORY\"/><Cell col=\"1\" edittype=\"none\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:PRODUCT_NAME\" tooltiptext=\"bind:DESCRIPTION\"/><Cell col=\"2\" edittype=\"none\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:REGION\" combodataset=\"ds_region\" combocodecol=\"REGION_NAME\" combodatacol=\"REGION_NAME\"/><Cell col=\"3\" edittype=\"none\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:COUNTRY\" combodataset=\"ds_country\" combocodecol=\"COUNTRY_NAME\" combodatacol=\"COUNTRY_NAME\"/><Cell col=\"4\" edittype=\"none\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:LOCATION\" combodataset=\"ds_location\" combocodecol=\"LOCATION_NAME\" combodatacol=\"LOCATION_NAME\"/><Cell col=\"5\" edittype=\"none\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:WAREHOUSE_NAME\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "150", "20", "80", "20", null, null, this);
            obj.set_taborder("6");
            obj.set_text("MENULIST");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 507, 28, this.div_top,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("1");
            		p.style.set_background("transparent");
            		p.style.set_border("0none solid black");

            	}
            );
            this.div_top.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 64, this.div_cond,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_cond.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1002, 670, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item10","div_cond.cbo_country","value","ds_cond","condCountry");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item0","Div01.category_combo","value","ds_cond","condCategory");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","Div01.product_edit","value","ds_cond","condProduct");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","Div01.warehouseName_edit","value","ds_cond","condWarehouse");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","Div01.region_combo","value","ds_cond","condRegion");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","Div01.country_combo","value","ds_cond","condCountry");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","Div01.location_combo","value","ds_cond","condLocation");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item6","div_cond.cbo_region","value","ds_cond","condRegion");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item7","div_cond.cbo_category","value","ds_cond","condCategory");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item9","div_cond.cbo_location","value","ds_cond","condLocation");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item8","div_cond.edt_houseName","value","ds_cond","condWarehouse");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item11","div_cond.edt_productName","value","ds_cond","condProduct");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("product.xfdl", function(exports) {
        /*
        화면명 : 직원 목록 조회 화면
        작성자 : 김진한
        작성일자 : 2024/09/10
        */

        
        /***************************************************
        * 함수명 : product_onload 
        * 내  용 :  로드시 cond dataset 가져오기
        ****************************************************/
        this.product_onload = function(obj,e)
        {
        	this.fn_loadBaseData();
        }

        /***************************************************
        * 함수명 : fn_loadBaseData 
        * 내  용 : 트랜잭션 호출
        ****************************************************/
        this.fn_loadBaseData = function(){

        	var strSvcId = "loadBaseData";
        	var strSvcUrl = "http://localhost:8080/baseData";
        	var inData = ""
        	var outData = "ds_region=outDataset, ds_country=outDataset2, ds_location=outDataset3, ds_category=outDataset4, ds_house=outDataset5";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Onload";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_Onload 
        * 내  용 : (콜백) 콤보박스 전체&선택 값 셋팅
        ****************************************************/
        this.fn_Callback_Onload = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		var existingCategory = this.ds_category.getColumn(0, "CATEGORY_NAME");
        		var existingRegion = this.ds_region.getColumn(0, "REGION_NAME");
        		var existingCountry = this.ds_country.getColumn(0, "COUNTRY_NAME");
        		var existingLocation = this.ds_location.getColumn(0, "LOCATION_NAME");
        		var existingWarehouse = this.ds_house.getColumn(0, "WAREHOUSE_NAME");
        		
        		if (existingCategory !== "- 전체 -") {
                    var newRow = this.ds_category.insertRow(0);
                    this.ds_category.setColumn(newRow, "CATEGORY_ID", "");
                    this.ds_category.setColumn(newRow, "CATEGORY_NAME", "- 전체 -");
                }
        		if (existingRegion !== "- 전체 -") {
                    var newRow = this.ds_region.insertRow(0);
                    this.ds_region.setColumn(newRow, "REGION_ID", "");
                    this.ds_region.setColumn(newRow, "REGION_NAME", "- 전체 -");
                }
                if (existingCountry !== "- 전체 -") {
        			var newRow = this.ds_country.insertRow(0);
        			this.ds_country.setColumn(newRow, "COUNTRY_ID", "");
        			this.ds_country.setColumn(newRow, "COUNTRY_NAME", "- 전체 -");
        			this.ds_country.setColumn(newRow, "REGION_ID", "");
                }
                if (existingLocation !== "- 전체 -") {
        			var newRow = this.ds_location.insertRow(0);
        			this.ds_location.setColumn(newRow, "LOCATION_ID", "");
        			this.ds_location.setColumn(newRow, "LOCATION_NAME", "- 전체 -");
        			this.ds_location.setColumn(newRow, "COUNTRY_ID", "");
                }
                if (existingWarehouse !== "- 전체 -") {
        			var newRow = this.ds_house.insertRow(0);
        			this.ds_house.setColumn(newRow, "WAREHOUSE_ID", "");
        			this.ds_house.setColumn(newRow, "WAREHOUSE_NAME", "- 선택 -");
                } 
                
                // 콤보 박스 선택 시 "- 전체 -" 보이게
                this.div_cond.cbo_category.set_index(0);
                this.div_cond.cbo_region.set_index(0);
                this.div_cond.cbo_country.set_index(0);
                this.div_cond.cbo_location.set_index(0);
        	}
        }

        
        /***************************************************
        * 함수명 : div_top_search_btn_onclick 
        * 내  용 : 조회 버튼 클릭 함수
        			fn_searchOnInventory(트랜잭션 호출), fn_Callback_SearchIVTR(콜백)
        ****************************************************/
        this.div_top_search_btn_onclick = function(obj,e)
        {
        	this.fn_searchOnInventory();
        }

        /***************************************************
        * 함수명 : fn_searchOnInventory 
        * 내  용 : 조회 트랜잭션
        ****************************************************/
        this.fn_searchOnInventory = function() {

        	var strSvcId = "loadinventoryInfo";
        	var strSvcUrl = "http://localhost:8080/inventoryInfo";
        	var inData = "inDataset=ds_cond"
        	var outData = "ds_inv=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_SearchIVTR";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_SearchIVTR 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_SearchIVTR = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        	}
        }

        
        /***************************************************
        * 함수명 : div_cond_region_combo_onitemchanged, filterCountryDataset
        * 내  용 : 지역 데이터셋 - 국가 데이터셋 연관관계 설정
        ****************************************************/
        this.div_cond_region_combo_onitemchanged = function(obj,e)
        {
        	var selectedRegionId = obj.value;
        	this.div_cond.cbo_country.set_index(0);
        	this.div_cond.cbo_location.set_index(0);
        	this.filterCountryDataset(selectedRegionId);
        }
        this.filterCountryDataset = function (regionId) {
        	this.ds_country.set_enableevent(false);
        	this.ds_location.set_enableevent(false);
        	
        	var filterExprCountry = "REGION_ID == '" + regionId + "' || REGION_ID == ''";
        	
        	if (regionId == 0) {
        		this.ds_country.filter("");
        		this.ds_location.filter("");
        	} else {
        		this.ds_country.filter(filterExprCountry);
        		
        		var countryIds = [];
        		
        		// 필터링된 국가 데이터셋에서 regionId에 맞는 countryId 뽑아서 배열에 저장
                for (var i = 0; i < this.ds_country.getRowCount(); i++) {
                    var countryId = this.ds_country.getColumn(i, "COUNTRY_ID"); 
                    var countryRegionId = this.ds_country.getColumn(i, "REGION_ID");
                    
                    if (countryRegionId == regionId) {
        				countryIds.push(countryId);
                    }
                }
                
                // countryId에 맞는 location 필터링
                if(countryIds.length>0) {
        			var filterExprLocation = "";
        			for (var i = 0; i < countryIds.length; i++) {
        				if (i > 0) {
        					filterExprLocation += " || ";
        				}
        				filterExprLocation += "COUNTRY_ID == '" + countryIds[i] + "' || COUNTRY_ID == ''";
        			}
        			this.ds_location.filter(filterExprLocation);
                } else {
        			this.ds_location.filter("");
                }
        	}

        	this.ds_country.set_enableevent(true);
        	this.ds_location.set_enableevent(true);
        }

        
        /***************************************************
        * 함수명 : div_cond_cbo_country_onitemchanged, filterLocationDataset
        * 내  용 : 국가 데이터셋 - 위치 데이터셋 연관관계 설정
        ****************************************************/
        this.div_cond_cbo_country_onitemchanged  = function(obj,e)
        {
        	var selectedCountryId = obj.value;
        	this.div_cond.cbo_location.set_index(0);
        	this.filterLocationDataset(selectedCountryId);
        }
        this.filterLocationDataset = function (countryId) {
        	this.ds_location.set_enableevent(false);
        	var filterExprLocation = "COUNTRY_ID == '" + countryId + "' || COUNTRY_ID == ''";
        	if (countryId == 0) {
        		this.ds_location.filter("");
        	} else {
        		this.ds_location.filter(filterExprLocation);
        	}
        	this.ds_location.set_enableevent(true);
        }

        
        /***************************************************
        * 함수명 : div_cond_edt_productName_onchanged, div_cond_edt_houseName_onchanged
        * 내  용 : edit값 입력시 데이터셋에 value 값 저장
        ****************************************************/
        this.div_cond_edt_productName_onchanged = function(obj,e)
        {
        	var newProductName = obj.value;
        	this.ds_cond.setColumn(0, "PRODUCT_NAME", newProductName);
        }
        this.div_cond_edt_houseName_onchanged = function(obj,e)
        {
        	var newHouseName = obj.value;
        	this.ds_cond.setColumn(0, "WAREHOUSE_NAME", newHouseName);
        }

        
        /***************************************************
        * 함수명 : fn_handleEnterKey
        * 내  용 : 각 조건 란에서 엔터키 입력 시 조회
        ****************************************************/
        this.fn_handleEnterKey = function(obj,e) {
        	obj.updateToDataset();
            if (e.keycode == 13) {  // 엔터키 keycode
                this.div_top_search_btn_onclick();
            }
        }
        this.div_cond_edt_productName_onkeydown = function(obj,e)
        {
        	this.fn_handleEnterKey(obj, e);
        }

        this.div_cond_edt_houseName_onkeydown = function(obj,e)
        {
        	this.fn_handleEnterKey(obj, e);
        }

        this.div_cond_cbo_category_onkeydown = function(obj,e)
        {
        	this.fn_handleEnterKey(obj, e);
        }

        this.div_cond_cbo_region_onkeydown = function(obj,e)
        {
        	this.fn_handleEnterKey(obj, e);
        }

        this.div_cond_cbo_country_onkeydown = function(obj,e)
        {
        	this.fn_handleEnterKey(obj, e);
        }

        this.div_cond_cbo_location_onkeydown = function(obj,e)
        {
        	this.fn_handleEnterKey(obj, e);
        }

        
        /***************************************************
        * 함수명 : div_top_btn_reset_onclick
        * 내  용 : btn_cond 초기화
        ****************************************************/
        this.div_top_btn_reset_onclick = function(obj,e)
        {	
        	this.ds_cond.setColumn(0, "condCategory", "");
        	this.ds_cond.setColumn(0, "condProduct", "");
        	this.ds_cond.setColumn(0, "condWarehouse", "");
        	this.ds_cond.setColumn(0, "condRegion", "");
        	this.ds_cond.setColumn(0, "condCountry", "");
        	this.ds_cond.setColumn(0, "condLocation", "");
        }

        
        /***************************************************
        * 함수명 : div_top_btn_add_onclick
        * 내  용 : 재고등록 팝업 오픈(신규 등록)
        ****************************************************/
        this.div_top_btn_add_onclick = function(obj,e)
        {	
        	// 데이터셋 초기화
        	//this.ds_inv.clear();
        	var data = this.ds_flag.getColumn(0, "Status")
        	if(data != 1){
        		this.ds_flag.setColumn(0, "Status", 1);
        	}
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);
            var objChild = new ChildFrame("productdetails_Modal", "absolute", nLeft, nTop, 300, 400);
            
            objChild.set_formurl("Base::productdetails_popup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");
        	var objArg = {
        		btnType: "new"
        	};
        	objChild.showModal(this.getOwnerFrame(), {}, objArg, this, "fn_callback_detailsModal");
        }

        /***************************************************
        * 함수명 : grd_inventory_oncelldblclick
        * 내  용 : 셀 더블클릭 재고 등록 팝업 오픈(데이터 가져갈 때)
        ****************************************************/
        this.grd_inventory_oncelldblclick = function(obj,e)
        {	
        	this.ds_flag.setColumn(0, "Status", 0);
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);
            var objChild = new ChildFrame("productdetails_Modal", "absolute", nLeft, nTop, 300, 400);
            trace(this.ds_flag.saveXML());
            objChild.set_formurl("Base::productdetails_popup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");
         	
         	// 선택한 행의 데이터 새로운 셋에 담기
         	var selectedRow = this.ds_inv.rowposition;
         	this.ds_send_inv.addRow();
         	this.ds_send_inv.copyRow(0, this.ds_inv, selectedRow);
         
        	var objArg = {
        		//ds_job: this.ds_job.saveXML()// 데이터셋을 XML 형태로 전달
        	};
        	objChild.showModal(this.getOwnerFrame()
        					 , {}
        					 , this
        					 , "fn_callback_detailsModal");
        }

        this.fn_callback_detailsModal = function(sPopupId,sReturn)
        {
        	if(sReturn == undefined){
        		sReturn = "";
        	}
        	if(sPopupId == "productdetails_Modal")
        	{
        		if(sReturn.length > 0){
        			var arrRtn = sReturn.split("|");
        		}
        	}
        }

        
        /***************************************************
        * 함수명 : btn_category_onclick
        * 내  용 : 카테고리 팝업창 오픈, fn_callback_categoryModal(콜백)
        ****************************************************/
        this.btn_category_onclick = function(obj,e)
        {
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);
            var objChild = new ChildFrame("categoryModal", "absolute", nLeft, nTop, 300, 400);
            
            objChild.set_formurl("Base::category_popup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");
        	  
        	var objArg = {
        		ds_category: this.ds_category.saveXML()
        	};
        	
        	objChild.showModal(this.getOwnerFrame()
        					 , {}
        					 , this
        					 , "fn_callback_categoryModal");
        }
        this.fn_callback_categoryModal  = function(sPopupId,sReturn)
        {
        	if(sReturn == undefined){
        		sReturn = "";
        	}
        	if(sPopupId == "categoryModal")
        	{
        		if(sReturn.length > 0){
        			var arrRtn = sReturn.split("|");
        			// 반환될 데이터 있을 시 입력
        		}
        	}
        }

        /***************************************************
        * 함수명 : btn_allAdd_onclick
        * 내  용 : 일괄등록 팝업창 오픈, fn_callback_registModal(콜백)
        ****************************************************/
        this.btn_allAdd_onclick = function(obj,e)
        {
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);
            var objChild = new ChildFrame("registModal", "absolute", nLeft, nTop, 300, 400);
            
            objChild.set_formurl("Base::regist_popup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");
        	  
        	var objArg = {
        	};
        	objChild.showModal(this.getOwnerFrame()
        					 , {}
        					 , this
        					 , "fn_callback_registModal");
        }
        this.fn_callback_registModal = function(sPopupId,sReturn)
        {
        	if(sReturn == undefined){
        		sReturn = "";
        	}
        	if(sPopupId == "registModal")
        	{
        		if(sReturn.length > 0){
        			var arrRtn = sReturn.split("|");
        		}
        	}
        }

        
        /***************************************************
        * 함수명 : dataReload
        * 내  용 : 리로드 함수
        ****************************************************/
        this.dataReload = function() {
        	this.reload();
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
            this.addEventHandler("onload", this.product_onload, this);
            this.div_top.btn_add.addEventHandler("onclick", this.div_top_btn_add_onclick, this);
            this.div_top.btn_search.addEventHandler("onclick", this.div_top_search_btn_onclick, this);
            this.div_top.btn_reset.addEventHandler("onclick", this.div_top_btn_reset_onclick, this);
            this.div_cond.cbo_category.addEventHandler("onitemchanged", this.div_cond_cbo_category_onitemchanged, this);
            this.div_cond.cbo_category.addEventHandler("onkeydown", this.div_cond_cbo_category_onkeydown, this);
            this.div_cond.cbo_location.addEventHandler("onkeydown", this.div_cond_cbo_location_onkeydown, this);
            this.div_cond.st_productName.addEventHandler("onclick", this.Div01_Static03_onclick, this);
            this.div_cond.edt_productName.addEventHandler("onkeydown", this.div_cond_edt_productName_onkeydown, this);
            this.div_cond.edt_productName.addEventHandler("onchanged", this.div_cond_edt_productName_onchanged, this);
            this.div_cond.st_houseName.addEventHandler("onclick", this.Div01_Static03_onclick, this);
            this.div_cond.edt_houseName.addEventHandler("oneditclick", this.div_cond_edt_houseName_oneditclick, this);
            this.div_cond.edt_houseName.addEventHandler("onkeydown", this.div_cond_edt_houseName_onkeydown, this);
            this.div_cond.edt_houseName.addEventHandler("onchanged", this.div_cond_edt_houseName_onchanged, this);
            this.div_cond.cbo_region.addEventHandler("onitemchanged", this.div_cond_region_combo_onitemchanged, this);
            this.div_cond.cbo_region.addEventHandler("onkeydown", this.div_cond_cbo_region_onkeydown, this);
            this.div_cond.cbo_country.addEventHandler("onitemchanged", this.div_cond_cbo_country_onitemchanged, this);
            this.div_cond.cbo_country.addEventHandler("onkeydown", this.div_cond_cbo_country_onkeydown, this);
            this.btn_category.addEventHandler("onclick", this.btn_category_onclick, this);
            this.btn_allAdd.addEventHandler("onclick", this.btn_allAdd_onclick, this);
            this.grd_inventory.addEventHandler("oncellclick", this.grd_inventory_oncellclick, this);
            this.grd_inventory.addEventHandler("oncelldblclick", this.grd_inventory_oncelldblclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);

        };

        this.loadIncludeScript("product.xfdl", true);

       
    };
}
)();
