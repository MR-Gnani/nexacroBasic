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
                this.set_name("regist_popup");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,648,185);
            }
            this.style.set_padding("0 0 0 0");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_regist", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"AMOUNT\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_category_val", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_product", this);
            obj._setContents("<ColumnInfo><Column id=\"PRODUCT_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PRODUCT_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_quantity", this);
            obj._setContents("<ColumnInfo><Column id=\"MAX_QUANTITY\" type=\"STRING\" size=\"256\"/><Column id=\"MIN_QUANTITY\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_title", "absolute", "20", "10", "172", "43", null, null, this);
            obj.set_taborder("0");
            obj.set_text("▣ 일괄 변경");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save", "absolute", null, "20", "60", "24", "20", null, this);
            obj.set_taborder("1");
            obj.set_text("저장");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Div("div_product", "absolute", "20", "71", null, "24", "20", null, this);
            obj.set_taborder("3");
            obj.set_text("Div01");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_productName", "absolute", "0", "0", "120", null, null, "0", this.div_product);
            obj.set_taborder("0");
            obj.set_text("상품명");
            obj.style.set_background("moccasin");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.div_product.addChild(obj.name, obj);
            obj = new Edit("edt_productId", "absolute", "121", "1", "133", null, null, "1", this.div_product);
            obj.set_taborder("1");
            obj.set_readonly("true");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 10 Dotum");
            obj.set_displaynulltext(" 상품ID");
            this.div_product.addChild(obj.name, obj);
            obj = new Combo("cbo_productName", "absolute", "255", "1", null, null, "1", "1", this.div_product);
            this.div_product.addChild(obj.name, obj);
            obj.set_taborder("2");
            obj.set_innerdataset("@ds_product");
            obj.set_codecolumn("PRODUCT_ID");
            obj.set_datacolumn("PRODUCT_NAME");

            obj = new Div("div_minQuantity", "absolute", "20", "94", null, "24", "20", null, this);
            obj.set_taborder("4");
            obj.set_text("Div02");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_minName", "absolute", "0", "0", "120", null, null, "0", this.div_minQuantity);
            obj.set_taborder("0");
            obj.set_text("최소 수량");
            obj.style.set_background("moccasin");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.div_minQuantity.addChild(obj.name, obj);
            obj = new Edit("edt_minQuantity", "absolute", "121", "1", null, null, "1", "1", this.div_minQuantity);
            obj.set_taborder("1");
            obj.set_readonly("true");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.div_minQuantity.addChild(obj.name, obj);

            obj = new Div("div_maxQuantity", "absolute", "20", "117", null, "24", "20", null, this);
            obj.set_taborder("5");
            obj.set_text("Div03");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_maxName", "absolute", "0", "0", "120", null, null, "0", this.div_maxQuantity);
            obj.set_taborder("0");
            obj.set_text("최대 수량");
            obj.style.set_background("moccasin");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.div_maxQuantity.addChild(obj.name, obj);
            obj = new Edit("edt_maxQuantity", "absolute", "121", "1", null, null, "1", "1", this.div_maxQuantity);
            obj.set_taborder("1");
            obj.set_readonly("true");
            obj.style.set_background("lightgrey");
            obj.style.set_border("1 solid black");
            obj.style.set_color("#000000ff");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.div_maxQuantity.addChild(obj.name, obj);

            obj = new Div("Div04", "absolute", "20", "140", null, "24", "20", null, this);
            obj.set_taborder("6");
            obj.set_text("Div04");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_amount", "absolute", "0", "0", "120", null, null, "0", this.Div04);
            obj.set_taborder("0");
            obj.set_text("수량");
            obj.style.set_background("moccasin");
            obj.style.set_align("center");
            obj.style.set_font("bold 11 Dotum");
            this.Div04.addChild(obj.name, obj);
            obj = new Edit("edt_amount", "absolute", "121", "1", null, null, "1", "1", this.Div04);
            obj.set_taborder("1");
            obj.style.set_align("right middle");
            obj.set_maxlength("10");
            this.Div04.addChild(obj.name, obj);

            obj = new Div("div_category", "absolute", "20", "48", null, "24", "20", null, this);
            obj.set_taborder("8");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Combo("cbo_cateogoryName", "absolute", "121", "1", null, null, "1", "1", this.div_category);
            this.div_category.addChild(obj.name, obj);
            obj.set_taborder("0");
            obj.set_innerdataset("@ds_category_val");
            obj.set_codecolumn("CATEGORY_ID");
            obj.set_datacolumn("CATEGORY_NAME");
            obj = new Static("st_cateogryName", "absolute", "0", "0", "120", null, null, "0", this.div_category);
            obj.set_taborder("1");
            obj.set_text("카테고리명");
            obj.style.set_background("moccasin");
            obj.style.set_align("middle");
            obj.style.set_font("bold 10 Dotum");
            this.div_category.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.div_product,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_text("Div01");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_product.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.div_minQuantity,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("4");
            		p.set_text("Div02");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_minQuantity.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.div_maxQuantity,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.set_text("Div03");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_maxQuantity.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.Div04,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("6");
            		p.set_text("Div04");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div04.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 24, this.div_category,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("8");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_category.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 648, 185, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");
            		p.style.set_padding("0 0 0 0");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","Div00.Combo00","value","ds_regist","CATEGORY_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","Div01.Edit00","value","ds_regist","PRODUCT_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","Div04.edt_amount","value","ds_regist","AMOUNT");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","Div01.Combo00","value","ds_regist","PRODUCT_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","Div02.Edit00","value","ds_quantity","MIN_QUANTITY");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","Div03.Edit00","value","ds_quantity","MAX_QUANTITY");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item6","div_category.cbo_cateogoryName","value","ds_regist","CATEGORY_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item7","div_product.cbo_productName","value","ds_regist","PRODUCT_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item8","div_minQuantity.edt_minQuantity","value","ds_quantity","MIN_QUANTITY");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item9","div_maxQuantity.edt_maxQuantity","value","ds_quantity","MAX_QUANTITY");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item10","div_product.edt_productId","value","ds_regist","PRODUCT_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("regist_popup.xfdl", function(exports) {
        /*
        화면명 : 재고 일괄 등록 팝업
        작성자 : 김진한
        작성일자 : 2024/09/11
        */

        
        /***************************************************
        * 함수명 : regist_popup_onload (팝업 로드)
        * 내  용 : fn_loadData(트랜잭션 호출), fn_Callback_Onload(콜백)
        ****************************************************/
        this.regist_popup_onload = function(obj,e)
        {
        	trace("LOAD COMPELETE");
        	this.ds_category_val.copyData(this.opener.ds_category); // 카테고리DS 가져오기
        	this.fn_loadData(); // 상품명,카테고리ID
        }
        this.fn_loadData = function(){
        	var strSvcId = "loadProductData";
        	var strSvcUrl = "http://localhost:8080/productData";
        	var inData = ""
        	var outData = "ds_product=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_CallbackOnload";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        this.fn_CallbackOnload = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		var existingCategory = this.ds_category_val.getColumn(0, "CATEGORY_NAME");
        		var existingProduct = this.ds_product.getColumn(0, "PRODUCT_NAME");
        		
        		// 부모 창에서 전체 가 있기 때문에 새로 삽입 필요x
        		if (existingCategory == "- 전체 -") {
        			this.ds_category_val.setColumn(0, "CATEGORY_NAME", "-선택-");
                }
                // 가져오는 데이터가 없기 때문에 새로 삽입, 중복 추가 방지
                if (existingProduct !== "- 선택 -") {
        			var newRow = this.ds_product.insertRow(0);
        			this.ds_product.setColumn(newRow, "PRODUCT_ID", "");
        			this.ds_product.setColumn(newRow, "PRODUCT_NAME", "- 선택 -");
                }
                this.div_category.cbo_cateogoryName.set_index(0);
                this.div_product.cbo_productName.set_index(0);
        	}
        }

        /***************************************************
        * 함수명 : div_category_cbo_cateogoryName_onitemchanged, filterCategoryById
        * 내  용 : 카테고리 id에 맞는 상품목록 콤보박스 동기화
        ****************************************************/
        this.div_category_cbo_cateogoryName_onitemchanged = function(obj,e)
        {	
        	var categoryId = obj.value;
        	this.filterCategoryById(categoryId);
        }
        this.filterCategoryById = function (categoryId) {
        	this.ds_product.set_enableevent(false);
        	var filterExprProduct = "CATEGORY_ID == '" + categoryId + "'";
        	this.ds_product.filter(filterExprProduct);
        	this.ds_product.set_enableevent(true);
        }

        
        /***************************************************
        * 함수명 : div_product_cbo_productName_onitemchanged
        * 내  용 : 최대최소 수량 가져오기 ,fn_loadQuantityData(트랜잭션), fn_CallbackQuantity(콜백)
        ****************************************************/
        this.div_product_cbo_productName_onitemchanged = function(obj,e)
        {
        	var productId = obj.value;
        	this.ds_regist.setColumn(0, "PRODUCT_ID", productId);
        	this.fn_loadQuantityData();
        }
        this.fn_loadQuantityData = function() {
        	var strSvcId = "loadQuantity";
        	var strSvcUrl = "http://localhost:8080/getMaxMinQuantity";
        	var inData = "inDataset=ds_regist"
        	var outData = "ds_quantity=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_CallbackQuantity";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        this.fn_CallbackQuantity = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        	} 
        }

        
        /***************************************************
        * 함수명 : btn_save_onclick
        * 내  용 : 저장, fn_checkVal(유효성검사), fn_saveFn(트랜잭션), fn_CallbackBatchRegist(콜백)
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
        		this.fn_saveFn();
        	} else {
        		trace("저장 작업 취소");
        	}
        }
        this.fn_checkVal = function() {
        	var categoryId = this.ds_regist.getColumn(0, "CATEGORY_NAME");
        	var productId = this.ds_regist.getColumn(0, "PRODUCT_NAME");
        	var amount = this.ds_regist.getColumn(0, "AMOUNT");
        	var minQuantity = this.ds_quantity.getColumn(0, "MIN_QUANTITY");
        	
        	
        	minQuantity = parseFloat(minQuantity.replace(/,/g, ''));
        	// 음수 기호를 포함하여 숫자만 허용
            if (amount.charAt(0) === '-') {
                amount = '-' + amount.replace(/[^0-9]/g, ''); // 첫 글자가 '-'일 때
            } else {
                amount = amount.replace(/[^0-9]/g, ''); // 음수 기호가 아닐 때
            }
            
            amount = parseFloat(amount) || 0; // 숫자로 변환
        	
            if (!categoryId || categoryId == 0) {
                return "카테고리란을 선택해 주세요."; 
            }
            if (!productId || productId == 0) {
                return "상품란을 선택해 주세요."; 
            }
            if (!amount || amount == 0) {
                return "수량을 입력해 주세요."; 
            }
            if (amount+minQuantity < 0) {
        		return "상품이 부족한 창고가 존재합니다.";
            }
            
            return null;
        }
        this.fn_saveFn = function() {
        	var strSvcId = "batchRegist";
        	var strSvcUrl = "http://localhost:8080/batchRegist";
        	var inData = "inDataset=ds_regist"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_CallbackBatchRegist";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        this.fn_CallbackBatchRegist = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		this.close();
        		if(this.opener && typeof this.opener.div_top_search_btn_onclick === 'function') {
        			alert("수량이 일괄 변경되었습니다.");
        			this.opener.div_top_search_btn_onclick();
        		}
        	} else if(nErrorCode == 1) {
        		alert("상품을 가지고 있는 창고가 존재하지 않습니다.")
        	}
        }
        this.Div04_edt_amount_ontextchanged = function(obj,e)
        {
        	var rawValue = obj.value.replace(/,/g, ''); // 기존의 천 단위 구분 기호 제거
            // 숫자와 '-'만 허용
            rawValue = rawValue.replace(/[^0-9-]/g, ''); 
            var firstRawValue = rawValue.indexOf('-')
            
            // '-'가 여러 개일 경우 첫 번째 것만 남기고 나머지는 제거
            if (firstRawValue !== -1) {
                rawValue = rawValue.substring(0, firstRawValue + 1) + rawValue.replace(/-/g, '');
            }
            
            // 빈 문자열이면 그대로 반환
            if (rawValue === '') {
                obj.set_value('');
                return;
            }
            
            // 음수 처리: 맨 앞에 '-'가 있는 경우
            var isNegative = false;
            if (rawValue.charAt(0) === '-') {
                isNegative = true;
                rawValue = rawValue.substring(1); // '-' 제거
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
            
            // 음수 기호 추가
            if (isNegative) {
                formattedValue = '-' + formattedValue;
            }

            // 포맷팅된 값을 입력 필드에 설정
            obj.set_value(formattedValue);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.regist_popup_onload, this);
            this.btn_save.addEventHandler("onclick", this.btn_save_onclick, this);
            this.div_product.edt_productId.addEventHandler("ondragleave", this.Div01_Edit00_ondragleave, this);
            this.div_product.cbo_productName.addEventHandler("onitemchanged", this.div_product_cbo_productName_onitemchanged, this);
            this.Div04.edt_amount.addEventHandler("ontextchanged", this.Div04_edt_amount_ontextchanged, this);
            this.div_category.cbo_cateogoryName.addEventHandler("onitemchanged", this.div_category_cbo_cateogoryName_onitemchanged, this);

        };

        this.loadIncludeScript("regist_popup.xfdl", true);

       
    };
}
)();
