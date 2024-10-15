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
                this.set_name("productdetails_popup");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,915,248);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_inv", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"DESCRIPTION\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_location", this);
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_category", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_load", this);
            obj._setContents("<ColumnInfo><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_house", this);
            obj._setContents("<ColumnInfo><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_rec_inv", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REGION\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_p_inv", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"DESCRIPTION\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_dummy", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PRICE\" type=\"STRING\" size=\"256\"/><Column id=\"DESCRIPTION\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_title", "absolute", "20", "23", "200", "35", null, null, this);
            obj.set_taborder("0");
            obj.set_text("▣  재고 등록");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", "20", "57", null, "24", "20", null, this);
            obj.set_taborder("1");
            obj.set_text("Div00");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_category", "absolute", "0", "0", "120", null, null, "0", this.Div00);
            obj.set_taborder("0");
            obj.set_text("카테고리");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_color("#46463dff");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.Div00.addChild(obj.name, obj);
            obj = new Combo("cbo_category", "absolute", "121", "1", "168", null, null, "1", this.Div00);
            this.Div00.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_innerdataset("@ds_category");
            obj.set_codecolumn("CATEGORY_ID");
            obj.set_datacolumn("CATEGORY_NAME");
            obj.style.set_color("black");

            obj = new Div("Div01", "absolute", "20", "80", null, "24", "20", null, this);
            obj.set_taborder("2");
            obj.set_text("Div01");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_house", "absolute", "0", "0", "120", null, null, "0", this.Div01);
            obj.set_taborder("0");
            obj.set_text("창고");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_color("#46463dff");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.Div01.addChild(obj.name, obj);
            obj = new Combo("cbo_house", "absolute", "121", "1", "168", null, null, "1", this.Div01);
            this.Div01.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_innerdataset("@ds_house");
            obj.set_codecolumn("WAREHOUSE_ID");
            obj.set_datacolumn("WAREHOUSE_NAME");
            obj.style.set_color("black");
            obj = new Edit("edt_region", "absolute", "290", "1", "168", null, null, "1", this.Div01);
            obj.set_taborder("2");
            obj.set_readonly("true");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_font("bold 9 Dotum");
            this.Div01.addChild(obj.name, obj);
            obj = new Edit("edt_country", "absolute", "459", "1", "168", null, null, "1", this.Div01);
            obj.set_taborder("3");
            obj.set_readonly("true");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_font("bold 9 Dotum");
            this.Div01.addChild(obj.name, obj);
            obj = new Edit("edt_location", "absolute", "628", "1", null, null, "1", "1", this.Div01);
            obj.set_taborder("4");
            obj.set_readonly("true");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_font("bold 9 Dotum");
            this.Div01.addChild(obj.name, obj);

            obj = new Div("Div02", "absolute", "20", "103", null, "24", "20", null, this);
            obj.set_taborder("3");
            obj.set_text("Div02");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_productId", "absolute", "0", "0", "120", null, null, "0", this.Div02);
            obj.set_taborder("0");
            obj.set_text("상품관리번호");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_color("#46463dff");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.Div02.addChild(obj.name, obj);
            obj = new Edit("edt_porductId", "absolute", "121", "1", "168", null, null, "1", this.Div02);
            obj.set_taborder("1");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            obj.set_readonly("true");
            this.Div02.addChild(obj.name, obj);
            obj = new Static("st_productName", "absolute", "290", "1", "120", null, null, "1", this.Div02);
            obj.set_taborder("2");
            obj.set_text("상품명");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_align("middle");
            obj.style.set_font("bold 11 Dotum");
            this.Div02.addChild(obj.name, obj);
            obj = new Edit("edt_productName", "absolute", "411", "1", null, null, "1", "1", this.Div02);
            obj.set_taborder("3");
            obj.set_maxlength("80");
            obj.style.set_color("black");
            this.Div02.addChild(obj.name, obj);

            obj = new Div("Div03", "absolute", "20", "126", null, "24", "20", null, this);
            obj.set_taborder("4");
            obj.set_text("Div03");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_amount", "absolute", "0", "0", "120", null, null, "0", this.Div03);
            obj.set_taborder("0");
            obj.set_text("수량");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_color("#46463dff");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.Div03.addChild(obj.name, obj);
            obj = new Edit("edt_amount", "absolute", "121", "1", "168", null, null, "1", this.Div03);
            obj.set_taborder("1");
            obj.style.set_align("right middle");
            obj.set_maxlength("9");
            this.Div03.addChild(obj.name, obj);
            obj = new Static("st_price", "absolute", "290", "1", "120", null, null, "1", this.Div03);
            obj.set_taborder("2");
            obj.set_text("가격");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_align("middle");
            obj.style.set_font("bold 11 Dotum");
            this.Div03.addChild(obj.name, obj);
            obj = new MaskEdit("MaskEdit00", "absolute", "411", "1", null, null, "1", "1", this.Div03);
            obj.set_taborder("3");
            obj.set_mask("!#,###,###.99");
            obj.set_limitbymask("both");
            obj.style.set_color("black");
            this.Div03.addChild(obj.name, obj);

            obj = new Div("Div04", "absolute", "20", "149", null, "82", "20", null, this);
            obj.set_taborder("5");
            obj.set_text("Div04");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_description", "absolute", "0", "0", "120", null, null, "0", this.Div04);
            obj.set_taborder("0");
            obj.set_text("비고");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid lightgrey");
            obj.style.set_color("#46463dff");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.Div04.addChild(obj.name, obj);

            obj = new Button("btn_update", "absolute", null, "30", "60", "24", "144", null, this);
            obj.set_taborder("6");
            obj.set_text("수정");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Button("btn_delete", "absolute", null, "30", "60", "24", "82", null, this);
            obj.set_taborder("7");
            obj.set_text("삭제");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("11 Dotum");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Button("btn_list", "absolute", null, "30", "60", "24", "20", null, this);
            obj.set_taborder("8");
            obj.set_text("목록");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save", "absolute", null, "30", "60", "24", "82", null, this);
            obj.set_taborder("9");
            obj.set_text("저장");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new TextArea("textarea_description", "absolute", "142", "151", "751", "78", null, null, this);
            obj.set_taborder("10");
            obj.set_wordwrap("char");
            obj.set_maxlength("666");
            obj.style.set_padding("3 0 0 3");
            obj.style.set_color("black");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("1");
            		p.set_text("Div00");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.set_text("Div01");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.Div02,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_text("Div02");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div02.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.Div03,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("4");
            		p.set_text("Div03");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div03.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 82, this.Div04,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.set_text("Div04");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div04.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 915, 248, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","Div01.edt_region","value","ds_inv","REGION_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","Div01.edt_country","value","ds_inv","COUNTRY_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","Div01.edt_location","value","ds_inv","LOCATION_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","Div02.edt_porductId","value","ds_inv","PRODUCT_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","Div00.cbo_category","value","ds_inv","CATEGORY_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","Div01.cbo_house","value","ds_inv","WAREHOUSE_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item8","Div03.edt_amount","value","ds_inv","AMOUNT");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item9","Div02.edt_productName","value","ds_inv","PRODUCT_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item10","textarea_description","value","ds_inv","DESCRIPTION");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item6","Div03.MaskEdit00","value","ds_inv","PRICE");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("productdetails_popup.xfdl", function(exports) {
        /*
        화면명 : 재고 등록 팝업 
        작성자 : 김진한
        작성일자 : 2024/09/11
        */

        
        flag = null;
        /***************************************************
        * 함수명 : productdetails_popup_onload 
        * 내  용 : 로드시 부모폼에서 데이터셋 가져오기
        ****************************************************/
        this.productdetails_popup_onload = function(obj,e)
        {	
        	this.ds_category.copyData(this.opener.ds_category); // copy parents dataset
        	this.ds_house.copyData(this.opener.ds_house);
        	flag = this.opener.ds_flag.getColumn(0, "Status");
        	trace(flag);
        	//if (!this.opener.ds_inv || this.opener.ds_inv.rowcount === 0) { // get inventory data
        	if (flag == 1) {
        		
        		trace("신규등록")
        		this.btn_update.set_visible(false);
        		this.btn_delete.set_visible(false);
        			var existingCategory = this.ds_category.getColumn(0, "CATEGORY_NAME");
        			
        			if (existingCategory == "- 전체 -") {
        				this.ds_category.setColumn(0, "CATEGORY_NAME", "- 선택 -");
        			}
        			this.Div00.cbo_category.set_index(0);
        			this.Div01.cbo_house.set_index(0);
        		return;
        	} else if (flag == 0) {
        		trace("수정팝업")
        		this.ds_rec_inv.copyData(this.opener.ds_send_inv);
        		this.btn_save.set_visible(false);
        		
        		this.Div00.cbo_category.set_enable(false);
        		this.Div01.cbo_house.set_enable(false);
        		this.Div02.edt_productName.set_enable(false);
        		this.Div03.MaskEdit00.set_enable(false);
        		this.textarea_description.set_enable(false);
        	}
        	var categoryId = this.ds_rec_inv.getColumn(0, "CATEGORY_ID")
        	var houseId = this.ds_rec_inv.getColumn(0, "WAREHOUSE_ID")
        	var amount = this.ds_rec_inv.getColumn(0, "AMOUNT")
        	
         	this.ds_inv.setColumn(0, "CATEGORY_ID", categoryId);
         	this.ds_inv.setColumn(0, "WAREHOUSE_ID", houseId);
        	this.ds_inv.setColumn(0, "AMOUNT", amount);
        	//복사본 데이터 추가
        	this.ds_dummy.setColumn(0, "CATEGORY_ID", categoryId);
         	this.ds_dummy.setColumn(0, "WAREHOUSE_ID", houseId);
        	this.ds_dummy.setColumn(0, "AMOUNT", amount);
        	
        	this.fn_loadHouseData();
        	this.fn_loadMatchData();
        }

        /***************************************************
        * 함수명 : fn_loadMatchData 
        * 내  용 : 데이터 로드 트랜잭션
        ****************************************************/
        this.fn_loadMatchData = function() {
        	var strSvcId = "loadMatchData";
        	var strSvcUrl = "http://localhost:8080/loadMatchData";
        	var inData = "inDataset=ds_rec_inv"
        	var outData = "ds_p_inv=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_loadMatchData";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_loadMatchData 
        * 내  용 : (콜백) 복사본데이터 만들기, 콤보박스 선택값 셋팅
        ****************************************************/
        this.fn_Callback_loadMatchData = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		var productId = this.ds_p_inv.getColumn(0, "PRODUCT_ID")
        		var productName = this.ds_p_inv.getColumn(0, "PRODUCT_NAME")
        		var price = this.ds_p_inv.getColumn(0, "PRICE")
        		var description = this.ds_p_inv.getColumn(0, "DESCRIPTION")
        		
        		this.ds_inv.setColumn(0, "PRODUCT_ID", productId);
        		this.ds_inv.setColumn(0, "PRODUCT_NAME", productName);
        		this.ds_inv.setColumn(0, "PRICE", price);
        		this.ds_inv.setColumn(0, "DESCRIPTION", description);
        		//복사본 데이터 추가
        		this.ds_dummy.setColumn(0, "PRODUCT_ID", productId);
        		this.ds_dummy.setColumn(0, "PRODUCT_NAME", productName);
        		this.ds_dummy.setColumn(0, "PRICE", price);
        		this.ds_dummy.setColumn(0, "DESCRIPTION", description);
        		
        		var existingCategory = this.ds_category.getColumn(0, "CATEGORY_NAME");
        			
        			if (existingCategory == "- 전체 -") {
        				this.ds_category.setColumn(0, "CATEGORY_NAME", "- 선택 -");
        			}
        	}
        }

        
        /***************************************************
        * 함수명 : Div01_house_combo_onitemchanged 
        * 내  용 :  창고 선택시 해당하는 위치, 지역, 국가 정보 셋팅
        ****************************************************/
        this.Div01_house_combo_onitemchanged = function(obj,e)
        {
        	var houseId = obj.value;
        	this.ds_inv.setColumn(0, "WAREHOUSE_ID", houseId);
        	this.fn_loadHouseData();
        }

        /***************************************************
        * 함수명 : fn_loadHouseData 
        * 내  용 : 로드 트랜잭션 호출
        ****************************************************/
        this.fn_loadHouseData = function() {
        	var strSvcId = "loadHouseData";
        	var strSvcUrl = "http://localhost:8080/loadHouseData";
        	var inData = "inDataset=ds_inv"
        	var outData = "ds_load=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fnCallback_LoadHouseData";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fnCallback_LoadHouseData 
        * 내  용 : (콜백) 복사본 데이터 셋팅
        ****************************************************/
        this.fnCallback_LoadHouseData = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		var regionData = this.ds_load.getColumn(0, "REGION_NAME")
        		var countryData = this.ds_load.getColumn(0, "COUNTRY_NAME")
        		var locationData = this.ds_load.getColumn(0, "LOCATION_NAME")
        		
        			this.ds_inv.setColumn(0, "REGION_NAME", regionData);
        			this.ds_inv.setColumn(0, "COUNTRY_NAME", countryData);
        			this.ds_inv.setColumn(0, "LOCATION_NAME", locationData);
        			// 복사본 데이터 추가
        			this.ds_dummy.setColumn(0, "REGION_NAME", regionData);
        			this.ds_dummy.setColumn(0, "COUNTRY_NAME", countryData);
        			this.ds_dummy.setColumn(0, "LOCATION_NAME", locationData);
        	}
        }

        
        /***************************************************
        * 함수명 : onitemchanged 
        * 내  용 :  필드값 입력 및 선택 시 ds_inv에 담기
        ****************************************************/
        this.Div00_category_combo_onitemchanged = function(obj,e)
        {
        	var newCategoryId = obj.value;
        	this.ds_inv.setColumn(0, "CATEGORY_ID", newCategoryId);
        }
        this.Div02_productName_edit_onchanged = function(obj,e)
        {
        	var newPName = obj.value;
        	this.ds_inv.setColumn(0, "PRODUCT_NAME", newPName);
        }
        this.Div03_edt_amount_ontextchanged = function(obj,e)
        {
        	var rawValue = obj.value.replace(/,/g, '');
            rawValue = rawValue.replace(/\D/g, '');
            
            // 빈 문자열이면 그대로 반환
            if (rawValue === '') {
                obj.set_value('');
                return;
            }
            
            // 천 단위 구분 기호를 추가
            var formattedValue = '';
            var length = rawValue.length;
            var counter = 0;

            for (var i = length - 1; i >= 0; i--) {
                // 현재 문자를 앞에 추가
                formattedValue = rawValue.charAt(i) + formattedValue;
                counter++;

                // 천 단위 구분 기호를 추가
                if (counter % 3 === 0 && i !== 0) {
                    formattedValue = ',' + formattedValue;
                }
            }

            // 포맷팅된 값을 입력 필드에 설정
            obj.set_value(formattedValue);
        }
        // this.Div03_edt_price_ontextchanged = function(obj:Edit, e:nexacro.TextChangedEventInfo)
        // {
        //     var rawValue = obj.value.replace(/,/g, ''); // 기존의 천 단위 구분 기호 제거, 이게 있어야 ,999 같은 오류가 안생김
        //     rawValue = rawValue.replace(/\D/g, '');
        //     
        //     // 빈 문자열이면 그대로 반환
        //     if (rawValue === '') {
        //         obj.set_value('');
        //         return;
        //     }
        //     
        //     // 천 단위 구분 기호를 추가
        //     var formattedValue = '';
        //     var length = rawValue.length;
        //     var counter = 0;
        // 
        //     for (var i = length - 1; i >= 0; i--) {
        //         // 현재 문자를 앞에 추가
        //         formattedValue = rawValue.charAt(i) + formattedValue;
        //         counter++;
        // 
        //         // 천 단위 구분 기호를 추가
        //         if (counter % 3 === 0 && i !== 0) {
        //             formattedValue = ',' + formattedValue;
        //         }
        //     }
        // 
        //     // 포맷팅된 값을 입력 필드에 설정
        //     obj.set_value(formattedValue);
        // }
        this.textarea_description_ontextchanged = function(obj,e)
        {
        	var newDescript = obj.value;
        	this.ds_inv.setColumn(0, "DESCRIPTION", newDescript);
        }

        
        /***************************************************
        * 함수명 : btn_update_onclick 
        * 내  용 : 수정 버튼 클릭
        ****************************************************/
        this.btn_update_onclick = function(obj,e)
        {
        	var validationMessage = this.fn_checkVal(); 
            if (validationMessage) {
                alert(validationMessage); 
                return; 
            }
            
            // 변경된 사항이 있는지 확인
            if (!this.hasChanges()) {
                alert("수정된 사항이 없습니다.");
                return;
            }
            
            var result = application.confirm("정말로 수정하시겠습니까?","TEST","warning");
        	if (result) {
        		this.fn_save(); 
        	} else {
        		trace("수정 작업 취소");
        	}
        }

        /***************************************************
        * 함수명 : hasChanges 
        * 내  용 : 현재 데이터셋과 원본 데이터셋 비교 (유효성검사)
        ****************************************************/
        this.hasChanges = function() {
        	
        	var rowType = this.ds_inv.getRowType();
        	var rowType2 = this.ds_dummy.getRowType();
        	
        	 // 현재 데이터셋의 첫 번째 행 데이터 가져오기
            var currentCategoryId = this.ds_inv.getColumn(0, "CATEGORY_ID");
            var currentWarehouseId = this.ds_inv.getColumn(0, "WAREHOUSE_ID");
            var currentRegionName = this.ds_inv.getColumn(0, "REGION_NAME");
            var currentCountryName = this.ds_inv.getColumn(0, "COUNTRY_NAME");
            var currentLocationName = this.ds_inv.getColumn(0, "LOCATION_NAME");
            var currentProductId = this.ds_inv.getColumn(0, "PRODUCT_ID");
            var currentProductName = this.ds_inv.getColumn(0, "PRODUCT_NAME");
            var currentAmount = this.ds_inv.getColumn(0, "AMOUNT");
            var currentPrice = this.ds_inv.getColumn(0, "PRICE");
            var currentDescription = this.ds_inv.getColumn(0, "DESCRIPTION");

            // 원본 데이터셋의 첫 번째 행 데이터 가져오기
            var dummyCategoryId = this.ds_dummy.getColumn(0, "CATEGORY_ID");
            var dummyWarehouseId = this.ds_dummy.getColumn(0, "WAREHOUSE_ID");
            var dummyRegionName = this.ds_dummy.getColumn(0, "REGION_NAME");
            var dummyCountryName = this.ds_dummy.getColumn(0, "COUNTRY_NAME");
            var dummyLocationName = this.ds_dummy.getColumn(0, "LOCATION_NAME");
            var dummyProductId = this.ds_dummy.getColumn(0, "PRODUCT_ID");
            var dummyProductName = this.ds_dummy.getColumn(0, "PRODUCT_NAME");
            var dummyAmount = this.ds_dummy.getColumn(0, "AMOUNT");
            var dummyPrice = this.ds_dummy.getColumn(0, "PRICE");
            var dummyDescription = this.ds_dummy.getColumn(0, "DESCRIPTION");

            // 데이터 비교
            return currentCategoryId !== dummyCategoryId ||
                   currentWarehouseId !== dummyWarehouseId ||
                   currentRegionName !== dummyRegionName ||
                   currentCountryName !== dummyCountryName ||
                   currentLocationName !== dummyLocationName ||
                   currentProductId !== dummyProductId ||
                   currentProductName !== dummyProductName ||
                   currentAmount !== dummyAmount ||
                   currentPrice !== dummyPrice ||
                   currentDescription !== dummyDescription;
        }

        
        /***************************************************
        * 함수명 : btn_save_onclick 
        * 내  용 : 저장 버튼 클릭
        ****************************************************/
        this.btn_save_onclick = function(obj,e)
        {
        	var validationMessage = this.fn_checkVal(); 
            if (validationMessage) {
                alert(validationMessage); 
                return; 
            }
            
            var result = application.confirm("정말로 저장하시겠습니까?","TEST","warning");
        	if (result) {
        		this.fn_save(); 
        	} else {
        		trace("저장 작업 취소");
        	}
        }

        /***************************************************
        * 함수명 : fn_checkVal 
        * 내  용 : 저장 시 유효성 검사
        ****************************************************/
        this.fn_checkVal = function() {
        	var categoryId = this.ds_inv.getColumn(0, "CATEGORY_ID");
        	var houseId = this.ds_inv.getColumn(0, "WAREHOUSE_ID");
        	var productName = this.ds_inv.getColumn(0, "PRODUCT_NAME");
        	var amount = this.ds_inv.getColumn(0, "AMOUNT");
        	var price = this.ds_inv.getColumn(0, "PRICE");

        	if (!categoryId || categoryId == 0) {
                return "카테고리란을 선택해 주세요."; 
            }
            if (!houseId || houseId == 0) {
                return "상품란을 선택해 주세요."; 
            }
            if (!productName) {
                return "상품명을 입력해 주세요."; 
            }
            if (!amount) {
                return "수량을 입력해 주세요."; 
            }
            if (!price) {
                return "가격을 입력해 주세요."; 
            }
            return null;
        }

        /***************************************************
        * 함수명 : fn_save 
        * 내  용 : 저장 트랜잭션
        ****************************************************/
        this.fn_save = function() {
        	var strSvcId = "saveInventory";
        	var strSvcUrl = "http://localhost:8080/saveInventory";
        	var inData = "inDataset=ds_inv"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_SaveInventory";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_SaveInventory 
        * 내  용 : (콜백) 저장 및 수정 완료 안내 메세지
        ****************************************************/
        this.fn_Callback_SaveInventory = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		
        		//this.close();
        		this.ds_dummy.copyData(this.ds_inv);
        		if(this.opener && typeof this.opener.div_top_search_btn_onclick === 'function') {
        			alert("저장 및 수정 작업이 완료되었습니다.");
        			this.opener.div_top_search_btn_onclick();
        		}
        		if(flag == 1) {
        			this.close();
        		}
        	} else if(nErrorCode == -1) {
        		alert("ERROR")
        	}
        }

        /***************************************************
        * 함수명 : btn_delete_onclick 
        * 내  용 : 삭제 함수
        ****************************************************/
        this.btn_delete_onclick = function(obj,e)
        {
        	var result = application.confirm("정말로 삭제하시겠습니까?","TEST","warning");
        	if (result) {
        		this.fn_deleteInfo();
        	} else {
        		trace("삭제 작업 취소");
        	}
        }

        /***************************************************
        * 함수명 : fn_deleteInfo 
        * 내  용 : 삭제 트랜잭션
        ****************************************************/
        this.fn_deleteInfo = function()
        {
        	var strSvcId = "delete";
        	var strSvcUrl = "http://localhost:8080/deleteInventory";
        	var inData = "inDataset=ds_inv"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Delete";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_Delete 
        * 내  용 : (콜백) 
        ****************************************************/
        this.fn_Callback_Delete = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		this.close();
        		// 팝업 종료 후 부모폼 서치 트랜잭션 수행
        		if(this.opener && typeof this.opener.div_top_search_btn_onclick === 'function') {
        			alert("삭제가 완료되었습니다.");
        			this.opener.div_top_search_btn_onclick();
        		}
        	} 
        	if(nErrorCode == 1) {
        		if(this.opener && typeof this.opener.div_top_search_btn_onclick === 'function') {
        			alert("해당하는 상품이 주문목록에 존재합니다.");
        			this.opener.div_top_search_btn_onclick();
        		}
        	}
        	
        }

        /***************************************************
        * 함수명 : btn_list_onclick 
        * 내  용 : 목록으로 이동
        ****************************************************/
        this.btn_list_onclick = function(obj,e)
        {
        	this.close();
        }

        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.productdetails_popup_onload, this);
            this.Div00.cbo_category.addEventHandler("onitemchanged", this.Div00_category_combo_onitemchanged, this);
            this.Div01.cbo_house.addEventHandler("onitemchanged", this.Div01_house_combo_onitemchanged, this);
            this.Div02.edt_productName.addEventHandler("onchanged", this.Div02_productName_edit_onchanged, this);
            this.Div03.edt_amount.addEventHandler("onchanged", this.Div03_amount_edit_onchanged, this);
            this.Div03.edt_amount.addEventHandler("ontextchanged", this.Div03_edt_amount_ontextchanged, this);
            this.Div03.edt_amount.addEventHandler("oneditclick", this.Div03_edt_amount_oneditclick, this);
            this.btn_update.addEventHandler("onclick", this.btn_update_onclick, this);
            this.btn_delete.addEventHandler("onclick", this.btn_delete_onclick, this);
            this.btn_list.addEventHandler("onclick", this.btn_list_onclick, this);
            this.btn_save.addEventHandler("onclick", this.btn_save_onclick, this);
            this.textarea_description.addEventHandler("ontextchanged", this.textarea_description_ontextchanged, this);

        };

        this.loadIncludeScript("productdetails_popup.xfdl", true);

       
    };
}
)();
