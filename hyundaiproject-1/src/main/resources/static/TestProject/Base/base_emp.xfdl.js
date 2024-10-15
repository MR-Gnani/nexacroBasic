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
                this.set_name("base_emp");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1002,670);
            }
            this.style.set_border("0 none #808080ff");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_emp", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/><Column id=\"LAST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"HIRE_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_DOMAIN\" type=\"STRING\" size=\"256\"/><Column id=\"FULL_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FULL_EMAIL\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_searchList", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_cond", this);
            obj._setContents("<ColumnInfo><Column id=\"sendName\" type=\"STRING\" size=\"256\"/><Column id=\"sendDateFrom\" type=\"STRING\" size=\"256\"/><Column id=\"sendDateTo\" type=\"STRING\" size=\"256\"/><Column id=\"sendMgr\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_mgr", this);
            obj._setContents("<ColumnInfo><Column id=\"MANAGER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_job", this);
            obj._setContents("<ColumnInfo><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_selected", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/><Column id=\"LAST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"HIRE_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_email", this);
            obj._setContents("<ColumnInfo><Column id=\"EMAIL_DOMAIN\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_cond", "absolute", "20", "44", null, "37", "20", null, this);
            obj.set_taborder("13");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Combo("cbo_mgr", "absolute", "646", "8", "142", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("3");
            obj.set_innerdataset("@ds_mgr");
            obj.set_codecolumn("MANAGER_ID");
            obj.set_datacolumn("FIRST_NAME");
            obj = new Calendar("cal_To", "absolute", "426", "8", "134", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("2");
            obj.set_dateformat("yyyy-MM-dd");
            obj.style.set_padding("0 5 0 0");
            obj = new Static("st_mgr", "absolute", "600", "8", "41", "20", null, null, this.div_cond);
            obj.set_taborder("4");
            obj.set_text("관리자");
            obj.style.set_align("right middle");
            this.div_cond.addChild(obj.name, obj);
            obj = new Static("st_bar", "absolute", "397", "8", "24", "20", null, null, this.div_cond);
            obj.set_taborder("5");
            obj.set_text("-");
            obj.style.set_align("middle");
            obj.style.set_font("bold 9 Dotum");
            this.div_cond.addChild(obj.name, obj);
            obj = new Calendar("cal_From", "absolute", "263", "8", "129", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_dateformat("yyyy-MM-dd");
            obj.style.set_padding("0 5 0 0");
            obj = new Static("st_hireDate", "absolute", "220", "8", "38", "20", null, null, this.div_cond);
            obj.set_taborder("6");
            obj.set_text("고용일");
            obj.style.set_align("right middle");
            this.div_cond.addChild(obj.name, obj);
            obj = new Edit("edt_name", "absolute", "59", "8", "121", "20", null, null, this.div_cond);
            obj.set_taborder("0");
            obj.style.set_align("left middle");
            obj.set_maxlength("80");
            this.div_cond.addChild(obj.name, obj);
            obj = new Static("st_name", "absolute", "20", "8", "34", "20", null, null, this.div_cond);
            obj.set_taborder("7");
            obj.set_text("이름");
            obj.style.set_align("right middle");
            obj.style.set_font("10 Dotum");
            this.div_cond.addChild(obj.name, obj);

            obj = new Static("st_title", "absolute", "20", "14", "200", "28", null, null, this);
            obj.set_taborder("4");
            obj.set_text("▣ 직원 목록");
            obj.style.set_background("transparent");
            obj.style.set_align("left middle");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_emplist", "absolute", "20", "83", null, null, "20", "20", this);
            obj.set_taborder("11");
            obj.set_binddataset("ds_emp");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"81\"/><Column size=\"234\"/><Column size=\"207\"/><Column size=\"289\"/><Column size=\"135\"/><Column size=\"145\"/><Column size=\"0\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell style=\"background:#8eb5e3ff;\" text=\"관리번호\"/><Cell col=\"1\" style=\"background:#8eb5e3ff;\" text=\"직책\"/><Cell col=\"2\" style=\"background:#8eb5e3ff;\" text=\"이름\"/><Cell col=\"3\" style=\"background:#8eb5e3ff;\" text=\"EMAIL\"/><Cell col=\"4\" style=\"background:#8eb5e3ff;\" text=\"고용일\"/><Cell col=\"5\" style=\"background:#8eb5e3ff;\" text=\"관리자명\"/><Cell col=\"6\" text=\"PHONE\" expandsize=\"0\"/></Band><Band id=\"body\"><Cell text=\"bind:EMPLOYEE_ID\"/><Cell col=\"1\" style=\"align:left;padding:0 0 0 2;\" text=\"bind:JOB_TITLE\"/><Cell col=\"2\" style=\"align:left;padding:0 0 0 2;\" text=\"bind:FULL_NAME\"/><Cell col=\"3\" style=\"align:left;padding:0 0 0 2;\" text=\"bind:EMAIL\"/><Cell col=\"4\" text=\"bind:HIRE_DATE\" calendardisplaynulltype=\"default\"/><Cell col=\"5\" style=\"align:left;\" text=\"bind:MANAGER_ID\"/><Cell col=\"6\" text=\"bind:PHONE\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("div_btn", "absolute", null, "16", "504", "28", "20", null, this);
            obj.set_taborder("14");
            obj.set_text("Div01");
            this.addChild(obj.name, obj);
            obj = new Button("btn_reset", "absolute", null, "2", "35", "24", "124", null, this.div_btn);
            obj.set_taborder("0");
            obj.style.set_image("URL('theme://hiclipart.com (1).png')");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("1 solid #999999ff");
            obj.style.set_cursor("hand");
            this.div_btn.addChild(obj.name, obj);
            obj = new Button("btn_search", "absolute", null, "2", "60", "24", "62", null, this.div_btn);
            obj.set_taborder("1");
            obj.set_text("조회");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("1 solid #999999ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_btn.addChild(obj.name, obj);
            obj = new Button("btn_add", "absolute", null, "2", "60", "24", "0", null, this.div_btn);
            obj.set_taborder("2");
            obj.set_text("등록");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("1 solid #999999ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_btn.addChild(obj.name, obj);

            obj = new Button("btn_menu", "absolute", "150", "20", "80", "20", null, null, this);
            obj.set_taborder("15");
            obj.set_text("MENULIST");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 37, this.div_cond,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("13");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_cond.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 504, 28, this.div_btn,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("14");
            		p.set_text("Div01");

            	}
            );
            this.div_btn.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1002, 670, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");
            		p.style.set_border("0 none #808080ff");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item3","Div00.cbo_mgr","value","ds_cond","sendMgr");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","Div00.cal_To","value","ds_cond","sendDateTo");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","Div00.cal_From","value","ds_cond","sendDateFrom");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item0","Div00.edt_name","value","ds_cond","sendName");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","div_cond.edt_name","value","ds_cond","sendName");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","div_cond.cal_From","value","ds_cond","sendDateFrom");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item6","div_cond.cal_To","value","ds_cond","sendDateTo");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item7","div_cond.cbo_mgr","value","ds_cond","sendMgr");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("base_emp.xfdl", function(exports) {
        /*
        화면명 : 직원 목록 조회 화면
        작성자 : 김진한
        작성일자 : 2024/09/09
        */

        /***************************************************
        * 함수명 : base_emp_onload 
        * 내  용 : 로드 시 데이터 가져오기(트랜잭션), fn_callback_loadMgrInfo(콜백)
        ****************************************************/
        this.base_emp_onload = function(obj,e)
        {
        	this.fn_loadMgrJobData();
        }

        this.fn_loadMgrJobData = function(){
        	var strSvcId = "managerInfo";
        	var strSvcUrl = "http://localhost:8080/mgrInfo";
        	var inData = ""
        	var outData = "ds_mgr=outDataset, ds_job=outDataset2, ds_email=outDataset3";
        	var strAvg = "";
        	var callBackFnc = "fn_callback_loadMgrInfo";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        /***************************************************
        * 함수명 : fn_callback_loadMgrInfo 
        * 내  용 : 콤보박스 전체&선택 값 넣어주기(콜백)
        ****************************************************/
        this.fn_callback_loadMgrInfo = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		var existingManagerId = this.ds_mgr.getColumn(0, "MANAGER_ID");
        		var existingJobTitle = this.ds_job.getColumn(0, "JOB_TITLE");
        		var existingemail = this.ds_email.getColumn(0, "EMAIL_DOMAIN");
        		
        		if (existingManagerId !== "") {
                    var newRow = this.ds_mgr.insertRow(0);
                    this.ds_mgr.setColumn(newRow, "MANAGER_ID", "");
                    this.ds_mgr.setColumn(newRow, "FIRST_NAME", "- 전체 -");
                }
                if (existingJobTitle !== "- 선택 -") {
        			var newRow = this.ds_job.insertRow(0);
        			this.ds_job.setColumn(newRow, "JOB_TITLE", "- 선택 -");
                }
                if (existingemail !== "- 선택 -") {
        			var newRow = this.ds_email.insertRow(0);
        			this.ds_email.setColumn(newRow, "EMAIL_DOMAIN", "- 선택 -");
                }
                this.div_cond.cbo_mgr.set_index(0);
        	}
        }

        /***************************************************
        * 함수명 : btn_search_onclick 
        * 내  용 : 조회 클릭 
        ****************************************************/
        this.btn_search_onclick = function(obj,e)
        {	
        	this.fn_checkVal();
        }

        /***************************************************
        * 함수명 : fn_search_empInfo 
        * 내  용 : 조회(트랜잭션)
        ****************************************************/
        this.fn_search_empInfo = function()
        {
        	var strSvcId = "baseId";
        	var strSvcUrl = "http://localhost:8080/base";
        	var inData = "inDataset=ds_cond"
        	var outData = "ds_emp=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_callback_searchEmpInfo";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_callback_searchEmpInfo 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_callback_searchEmpInfo = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		
        	}
        }

        /***************************************************
        * 함수명 : fn_checkVal 
        * 내  용 : 조회 유효성 검사
        ****************************************************/
        this.fn_checkVal = function(){
        	var fromDate = this.ds_cond.getColumn(0, "sendDateFrom");
        	var toDate = this.ds_cond.getColumn(0, "sendDateTo");
        	
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
        	
        	this.fn_search_empInfo();
        }

        
        /***************************************************
        * 함수명 : btn_reset_onclick 
        * 내  용 : 조회 조건 ds_cond초기화
        ****************************************************/
        this.btn_reset_onclick = function(obj,e)
        {	
        	this.div_cond.edt_name.set_value("");
        	this.div_cond.cal_From.set_value("");
        	this.div_cond.cal_To.set_value("");
        	this.div_cond.cbo_mgr.set_value("");
        }

        
        /***************************************************
        * 함수명 : btn_add_onclick 
        * 내  용 : 등록하기 버튼(신규 등록), fn_callback_modalForm(콜백)
        ****************************************************/
        this.btn_add_onclick = function(obj,e) {
           var nLeft = system.clientToScreenX(this, 10);
           var nTop  = system.clientToScreenY(this, 10);
           var objChild = new ChildFrame("popModalForm", "absolute", nLeft, nTop, 300, 400);
                    
        	// 팝업할 폼 파일 설정
        	objChild.set_formurl("Base::modal_emp.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");  

                
        	// 팝업창에 데이터셋 전달
        	var objArg = {
        		ds_mgr: this.ds_mgr.saveXML(),
        		ds_job: this.ds_job.saveXML()// 데이터셋을 XML 형태로 전달
        	};
                    
        	// 모달로 팝업 표시
        	objChild.showModal(this.getOwnerFrame()
        					 , {}
        					 , this
        					 , "fn_callback_modalForm");
        };

        /***************************************************
        * 함수명 : grd_emplist_oncelldblclick 
        * 내  용 : 셀 클릭 함수(기존 정보 수정)
        ****************************************************/
        this.grd_emplist_oncelldblclick = function(obj,e)
        {
        	var nRow = e.row;
        	if(nRow < 0) return;
        	
        	var selectedRow = e.row;
        	
        	this.ds_selected.addRow();
        	
        	var selectedId = obj.getCellValue(selectedRow, "0");
        	var selectedJob = obj.getCellValue(selectedRow, "1");
        	var selectedName = obj.getCellValue(selectedRow, "2");
        	var selectedEmail = obj.getCellValue(selectedRow, "3");
        	var selectedHireDate = obj.getCellValue(selectedRow, "4");
        	var selectedMgr = obj.getCellValue(selectedRow, "5");
        	var selectedPhone = obj.getCellValue(selectedRow, "6");
            
        	this.ds_selected.setColumn(0, "EMPLOYEE_ID", selectedId);
        	this.ds_selected.setColumn(0, "JOB_TITLE", selectedJob);
        	this.ds_selected.setColumn(0, "FIRST_NAME", selectedName);
        	this.ds_selected.setColumn(0, "EMAIL", selectedEmail);
        	this.ds_selected.setColumn(0, "HIRE_DATE", selectedHireDate);
        	this.ds_selected.setColumn(0, "MANAGER_ID", selectedMgr);
        	this.ds_selected.setColumn(0, "PHONE", selectedPhone);

            // 팝업 창 위치 설정;
            var nLeft = system.clientToScreenX(this, 10);
            var nTop = system.clientToScreenY(this, 10);

            // ChildFrame 생성
            var objChild = new ChildFrame("popModalForm", "absolute", nLeft, nTop, 300, 400);
            
            // 팝업할 폼 파일 설정
            objChild.set_formurl("Base::modal_emp.xfdl");
            objChild.set_openalign("center middle");
            objChild.set_dragmovetype("all");  

            // 팝업창에 데이터셋 전달
            var objArg = {
        		row: nRow,
                ds_mgr: this.ds_mgr.saveXML(),
                ds_job: this.ds_job.saveXML(),
                ds_selected: this.ds_selected.saveXML()
            };

            // 모달로 팝업 표시
            objChild.showModal(this.getOwnerFrame(), {}, this, "fn_callback_modalForm2");
        }

        /***************************************************
        * 함수명 : fn_callback_modalForm2 
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_callback_modalForm2 = function(sPopupId,sReturn) {
            if (sReturn === undefined) {
                sReturn = "";
            }
            if (sPopupId === "popModalForm") {
        		this.ds_selected.clearData();
                if (sReturn.length > 0) {
                    var arrRtn = sReturn.split("|");
                   
                    this.div_search.form.edt_dept_cd.set_value(arrRtn[0]);
                    this.div_search.form.edt_dept_nm.set_value(arrRtn[1]);
                }
            }
        };

        
        /***************************************************
        * 함수명 : common_onkeydown 
        * 내  용 : 엔터 키 입력 함수(조회)
        ****************************************************/
        this.common_onkeydown = function(obj,e)
        {
        	 if (e.keycode == 13) {  //엔터키 keycode
        		obj.updateToDataset();
                this.btn_search_onclick();  
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
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.ds_mgr.addEventHandler("onload", this.ds_mgr_onload, this);
            this.addEventHandler("onload", this.base_emp_onload, this);
            this.div_cond.cbo_mgr.addEventHandler("onitemchanged", this.Combo00_onitemchanged, this);
            this.div_cond.cbo_mgr.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.div_cond.cal_To.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.div_cond.st_bar.addEventHandler("onclick", this.Static01_onclick, this);
            this.div_cond.cal_From.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.div_cond.cal_From.addEventHandler("oneditclick", this.div_cond_cal_From_oneditclick, this);
            this.div_cond.cal_From.addEventHandler("onchanged", this.div_cond_cal_From_onchanged, this);
            this.div_cond.edt_name.addEventHandler("onkeydown", this.common_onkeydown, this);
            this.div_cond.edt_name.addEventHandler("oneditclick", this.edit_name_oneditclick, this);
            this.st_title.addEventHandler("onclick", this.st_title_onclick, this);
            this.grd_emplist.addEventHandler("oncelldblclick", this.grd_emplist_oncelldblclick, this);
            this.div_btn.btn_reset.addEventHandler("onclick", this.btn_reset_onclick, this);
            this.div_btn.btn_search.addEventHandler("onclick", this.btn_search_onclick, this);
            this.div_btn.btn_add.addEventHandler("onclick", this.btn_add_onclick, this);
            this.btn_menu.addEventHandler("onclick", this.btn_menu_onclick, this);

        };

        this.loadIncludeScript("base_emp.xfdl", true);

       
    };
}
)();
