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
                this.set_name("category_popup");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,648,89);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_category_val", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_category", this);
            obj._setContents("<ColumnInfo><Column id=\"CATEGORY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"CATEGORY_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("st_title", "absolute", "20", "11", "204", "43", null, null, this);
            obj.set_taborder("0");
            obj.set_text("▣ 카테고리 관리");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save", "absolute", null, "21", "60", "24", "20", null, this);
            obj.set_taborder("1");
            obj.set_text("저장");
            obj.style.set_background("#4f81bdff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", "20", "48", null, "24", "20", null, this);
            obj.set_taborder("2");
            obj.set_text("Div00");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_categoryName", "absolute", "0", "0", "110", null, null, "0", this.Div00);
            obj.set_taborder("0");
            obj.set_text("카테고리명");
            obj.style.set_background("moccasin");
            obj.style.set_border("1solid solid #808080ff");
            obj.style.set_align("middle");
            obj.style.set_font("bold 11 Dotum");
            this.Div00.addChild(obj.name, obj);
            obj = new Edit("edt_categoryName", "absolute", "111", "1", null, null, "1", "1", this.Div00);
            obj.set_taborder("1");
            obj.set_maxlength("80");
            this.Div00.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 472, 39, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.set_text("Div00");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 648, 89, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","Div00.edt_categoryName","value","ds_category","CATEGORY_NAME");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("category_popup.xfdl", function(exports) {
        /*
        화면명 : 카테고리 등록 팝업
        작성자 : 김진한
        작성일자 : 2024/09/10
        */

        
        /***************************************************
        * 함수명 : category_popup_onload (팝업 로드)
        * 내  용 : 로드시 product폼에서 카테고리 데이터 셋 가져오기
        ****************************************************/
        this.category_popup_onload = function(obj,e)
        {
        	this.ds_category_val.copyData(this.opener.ds_category);
        }

        /***************************************************
        * 함수명 : btn_save_onclick 
        * 내  용 : 저장 버튼 클릭
        ****************************************************/
        this.btn_save_onclick = function(obj,e)
        {	
        	if (this.fn_checkVal()) { // validation check
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
        * 내  용 : 유효성 검사
        ****************************************************/
        this.fn_checkVal = function() {
        	var categoryName = this.ds_category.getColumn(0, "CATEGORY_NAME")
        	
            if (categoryName === null || categoryName.trim() === "") {
                alert("카테고리를 입력해주세요");
                return true; 
            }
        	
        	categoryName = categoryName.toUpperCase();
        	
        	var isExist = false;
        	for (var i = 0; i <this.ds_category_val.getRowCount(); i++) {
        		if(this.ds_category_val.getColumn(i, "CATEGORY_NAME") === categoryName) {
        			isExist = true;
        			break;
        		}
        	}
        	if (isExist) {
                alert("동일한 카테고리명이 존재합니다.");
                return true; 
            }
        	
        	return isExist;
        }

        /***************************************************
        * 함수명 : fn_save 
        * 내  용 : 저장 트랜잭션
        ****************************************************/
        this.fn_save = function() {
        	var strSvcId = "categorySave";
        	var strSvcUrl = "http://localhost:8080/categorySave";
        	var inData = "inDataset=ds_category"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Save";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_Save 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_Save = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		this.close();
        		if(this.opener && typeof this.opener.fn_loadBaseData === 'function') {
        			alert("신규 카테고리가 등록되었습니다.");
        			this.opener.fn_loadBaseData();
        		}
        		
        	}
        }

        /***************************************************
        * 함수명 : Div00_edt_categoryName_onkeydown
        * 내  용 : 엔터키 저장 함수
        ****************************************************/
        this.Div00_edt_categoryName_onkeydown = function(obj,e)
        {
        	if (e.keycode == 13) {  //엔터키 keycode
        		obj.updateToDataset();
                this.btn_save_onclick();  
            }
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.category_popup_onload, this);
            this.btn_save.addEventHandler("onclick", this.btn_save_onclick, this);
            this.Div00.edt_categoryName.addEventHandler("oneditclick", this.Div00_Edit00_oneditclick, this);
            this.Div00.edt_categoryName.addEventHandler("onkeydown", this.Div00_edt_categoryName_onkeydown, this);

        };

        this.loadIncludeScript("category_popup.xfdl", true);

       
    };
}
)();
