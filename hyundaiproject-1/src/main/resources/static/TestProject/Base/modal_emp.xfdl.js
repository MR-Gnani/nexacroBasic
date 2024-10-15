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
                this.set_name("modal_emp");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,915,300);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_emp", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/><Column id=\"LAST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"HIRE_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID_S\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_DOMAIN\" type=\"STRING\" size=\"256\"/><Column id=\"FULL_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FULL_EMAIL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_mgr2", this);
            obj._setContents("<ColumnInfo><Column id=\"MANAGER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_job2", this);
            obj._setContents("<ColumnInfo><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_email", this);
            obj._setContents("<ColumnInfo><Column id=\"EMAIL_DOMAIN\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_emp_copy", this);
            obj._setContents("<ColumnInfo><Column id=\"EMPLOYEE_ID\" type=\"INT\" size=\"256\"/><Column id=\"LAST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FIRST_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"HIRE_DATE\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID_S\" type=\"STRING\" size=\"256\"/><Column id=\"MANAGER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"JOB_TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"EMAIL_DOMAIN\" type=\"STRING\" size=\"256\"/><Column id=\"FULL_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"FULL_EMAIL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("Static00", "absolute", "20", "16", null, "28", "622", null, this);
            obj.set_taborder("25");
            obj.set_text("▣  직원 등록");
            obj.style.set_background("transparent");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "20", "46", null, "24", "20", null, this);
            obj.set_taborder("3");
            obj.style.set_background("white");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "20", "69", null, "24", "20", null, this);
            obj.set_taborder("4");
            obj.style.set_background("white");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "20", "92", null, "24", "20", null, this);
            obj.set_taborder("5");
            obj.style.set_background("white");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "20", "115", null, "24", "20", null, this);
            obj.set_taborder("6");
            obj.style.set_background("white");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "138", null, null, "20", "20", this);
            obj.set_taborder("7");
            obj.style.set_background("#c0c0c0ff");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_align("center");
            obj.style.set_font("bold 14 Dotum");
            obj.set_text("file upload");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "20", "46", "136", "24", null, null, this);
            obj.set_taborder("8");
            obj.set_text("관리번호");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "20", "69", "136", "24", null, null, this);
            obj.set_taborder("9");
            obj.set_text("이름");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "20", "92", "136", "24", null, null, this);
            obj.set_taborder("10");
            obj.set_text("EMAIL");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "20", "115", "136", "24", null, null, this);
            obj.set_taborder("11");
            obj.set_text("PHONE");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "494", "46", null, "24", "271", null, this);
            obj.set_taborder("12");
            obj.set_text("관리자");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "494", "69", null, "24", "271", null, this);
            obj.set_taborder("13");
            obj.set_text("직책");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "494", "92", null, "24", "271", null, this);
            obj.set_taborder("14");
            obj.set_text("고용일");
            obj.style.set_background("moccasin");
            obj.style.set_border("1 solid #808080ff");
            obj.style.set_padding("0 2 0 0");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 9 Dotum");
            this.addChild(obj.name, obj);

            obj = new Edit("modal_id", "absolute", "158", "48", null, "20", "423", null, this);
            obj.set_taborder("15");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Fname", "absolute", "158", "71", null, "20", "589", null, this);
            obj.set_taborder("17");
            obj.set_displaynulltext("First name");
            obj.style.set_displaynulltextcolor("darkgray");
            obj.style.set_color("black");
            obj.style.set_align("left");
            obj.set_maxlength("30");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_email", "absolute", "158", "94", null, "20", "599", null, this);
            obj.set_taborder("20");
            obj.set_maxlength("30");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_phone", "absolute", "158", "117", null, "20", "22", null, this);
            obj.set_taborder("23");
            obj.set_inputtype("number");
            obj.set_maxlength("20");
            obj.style.set_align("left middle");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_mgr", "absolute", "646", "48", "246", "20", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("16");
            obj.set_codecolumn("MANAGER_ID");
            obj.set_innerdataset("@ds_mgr2");
            obj.set_datacolumn("FIRST_NAME");
            obj.set_index("-1");

            obj = new Combo("cbo_job", "absolute", "646", "71", "246", "20", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("19");
            obj.set_innerdataset("@ds_job2");
            obj.set_codecolumn("JOB_TITLE");
            obj.set_datacolumn("JOB_TITLE");
            obj.set_index("-1");

            obj = new Calendar("cal_hireDate", "absolute", "646", "94", "246", "20", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("22");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_value("null");
            obj.style.set_padding("0 5 0 0");

            obj = new Edit("edt_Lname", "absolute", "328", "71", null, "20", "423", null, this);
            obj.set_taborder("18");
            obj.style.set_displaynulltextcolor("darkgray");
            obj.style.set_color("black");
            obj.style.set_align("left");
            obj.set_displaynulltext("Last name");
            obj.set_maxlength("30");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "320", "94", null, "24", "576", null, this);
            obj.set_taborder("24");
            obj.set_text("@");
            obj.style.set_font("14 Dotum");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_email", "absolute", "341", "94", null, "20", "423", null, this);
            this.addChild(obj.name, obj);
            obj.set_innerdataset("@ds_email");
            obj.set_codecolumn("EMAIL_DOMAIN");
            obj.set_datacolumn("EMAIL_DOMAIN");
            obj.set_taborder("21");

            obj = new Div("Div00", "absolute", null, "16", "400", "28", "20", null, this);
            obj.set_taborder("29");
            obj.set_text("Div00");
            this.addChild(obj.name, obj);
            obj = new Button("btn_update", "absolute", null, "3", "60", "24", "0", null, this.Div00);
            obj.set_taborder("0");
            obj.set_text("수정");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid black");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("btn_save", "absolute", null, "3", "60", "24", "0", null, this.Div00);
            obj.set_taborder("1");
            obj.set_text("저장");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid black");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("btn_delete", "absolute", null, "3", "60", "24", "62", null, this.Div00);
            obj.set_taborder("2");
            obj.set_text("삭제");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid black");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.Div00.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 400, 28, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("29");
            		p.set_text("Div00");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 915, 300, this,
            	//-- Layout function
            	function(p) {
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","modal_id","value","ds_emp_copy","EMPLOYEE_ID");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","edt_Fname","value","ds_emp_copy","FIRST_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","edt_Lname","value","ds_emp_copy","LAST_NAME");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","edt_email","value","ds_emp_copy","EMAIL");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","cbo_email","value","ds_emp_copy","EMAIL_DOMAIN");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","edt_phone","value","ds_emp_copy","PHONE");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item7","cbo_job","value","ds_emp_copy","JOB_TITLE");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item8","cal_hireDate","value","ds_emp_copy","HIRE_DATE");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item6","cbo_mgr","value","ds_emp_copy","MANAGER_ID");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("modal_emp.xfdl", function(exports) {
        /*
        화면명 : 직원 정보 등록 화면
        작성자 : 김진한
        작성일자 : 2024/09/09
        */

        
        /***************************************************
        * 함수명 : modal_emp_onload (팝업 로드)
        * 내  용 : 로드시 데이터셋가져오기, 입력 폼 셋팅(이메일, 전화번호, 성-이름)
        ****************************************************/
        this.modal_emp_onload = function(obj,e)
        {   
        	// 부모폼에서 매니저 직업 데이터셋 가져오기
        	this.ds_mgr2.copyData(this.opener.ds_mgr);
        	this.ds_job2.copyData(this.opener.ds_job);
        	this.ds_email.copyData(this.opener.ds_email);
        	
        	// 콤보박스 클릭 시 "- 선택 -" 값 보이게
        	this.cbo_mgr.set_index(0);
        	this.cbo_job.set_index(0);
        	this.cbo_email.set_index(0);
        	
        	// 첫 번쨰 매니저 데이터 값이 없을 때만 "- 선택 -" 삽입, 중복 방지
        	var existingMgr = this.ds_mgr2.getColumn(0, "MANAGER_ID");	
        	if (existingMgr == "") {
        		this.ds_mgr2.setColumn(0, "FIRST_NAME", "- 선택 -");
        	}
        	
        	// 부모 폼에서 등록 클릭, 그리드 셀 클릭 분기 처리 
        	if (!this.opener.ds_selected || this.opener.ds_selected.rowcount === 0) {
        		trace("데이터 없음!!")
        		this.Div00.btn_update.set_visible(false);
        		this.Div00.btn_delete.set_visible(false);
        		return;
        	} else {
        		trace("데이터 있음!!")
        		this.ds_emp.copyData(this.opener.ds_selected);
        		this.Div00.btn_save.set_visible(false);
        	}
        	
        	// PRESIDENT 일시 mgr콤보박스 enable
        	var job = this.ds_emp.getColumn(0, "JOB_TITLE");
        	if(job == "PRESIDENT") {
        		this.cbo_mgr.set_enable();
        		}
        	
        	// 날짜, 전화 번호, 이메일, 이름 양식에 맞게 셋팅
        	var date = this.ds_emp.getColumn(0, "HIRE_DATE");
        	var phone = this.ds_emp.getColumn(0, "PHONE");
        	var email = this.ds_emp.getColumn(0,"EMAIL");
        	var fullName = this.ds_emp.getColumn(0, "FIRST_NAME");
        	var mgrName = this.ds_emp.getColumn(0, "MANAGER_ID");
        	
        	//매니저
        	var row = this.ds_mgr2.findRow("FIRST_NAME", mgrName);
        	var MgrId = this.ds_mgr2.getColumn(row, "MANAGER_ID");	
        	//날짜
        	var formattedDate = date.replace(/\D/g, '');
        	//이름
        	nIndex = fullName.split(" ");
        	//이메일
        	eIndex = email.split("@");
        	
        	this.ds_emp.setColumn(0, "HIRE_DATE", formattedDate);
        	this.ds_emp.setColumn(0, "FIRST_NAME", nIndex[0]);
        	this.ds_emp.setColumn(0, "LAST_NAME", nIndex[1]);
        	this.ds_emp.setColumn(0, "EMAIL", eIndex[0]);
        	
        	this.ds_emp.addColumn("MANAGER_ID","INT");
        	this.ds_emp.setColumn(0, "MANAGER_ID", MgrId);
        	
        	this.ds_emp.addColumn("EMAIL_DOMAIN","STRING");
        	this.ds_emp.setColumn(0, "EMAIL_DOMAIN", eIndex[1]);
        	/*this.cbo_email.set_value(eIndex[1]);*/
        	
        	this.ds_emp_copy.copyData(this.ds_emp);
        	var rowType = this.ds_emp_copy.getRowType();
        	
        }

        
        /***************************************************
        * 함수명 : btn_save_onclick 
        * 내  용 : 저장 버튼(신규 등록), 필드값 체크, 유효성
        ****************************************************/
        this.btn_save_onclick = function(obj,e)
        {
        	// 필수 필드 값 확인
            var firstName = this.ds_emp_copy.getColumn(0, "FIRST_NAME");
            var lastName = this.ds_emp_copy.getColumn(0, "LAST_NAME");
            var email = this.ds_emp_copy.getColumn(0, "EMAIL");
            var emailDomain = this.ds_emp_copy.getColumn(0, "EMAIL_DOMAIN");
            var phone = this.ds_emp_copy.getColumn(0, "PHONE");
            var managerId = this.ds_emp_copy.getColumn(0, "MANAGER_ID");
            var jobTitle = this.ds_emp_copy.getColumn(0, "JOB_TITLE");
            var hireDate = this.ds_emp_copy.getColumn(0, "HIRE_DATE");
            
            // 유효성 검사 및 알림 표시
        	if (!managerId) {
        		if(jobTitle != "PRESIDENT"){
        			alert("관리자를 선택해 주세요.");
        			return;
        		}
        	}
        		
            if (!firstName) {
                alert("FIRST NAME을 입력해 주세요.");
                return;
            }
            if (!lastName) {
                alert("LAST NAME을 입력해 주세요.");
                return;
            }
            if (!jobTitle || jobTitle == "- 선택 -") {
                alert("직책을 선택해 주세요.");
                return;
            }
            if (!email) {
                alert("이메일을 입력해 주세요.");
                return;
            }
            if (!emailDomain || emailDomain == "- 선택 -") {
                alert("이메일 도메인을 선택해주세요.");
                return;
            }
            if (!hireDate) {
                alert("고용일을 입력해 주세요.");
                return;
            }
            if (hireDate < 19000000) {
        		alert("1900년도 이후의 날짜만 입력이 가능합니다.");
        		return;
            }
            if (!phone) {
                alert("전화번호를 입력해 주세요.");
                return;
            }
            
            var result = application.confirm("정말로 저장하시겠습니까?","TEST","warning");
        	if (result) {
        		this.fn_addInfo();
        	} else {
        		trace("저장 작업 취소");
        	}
        }
        /***************************************************
        * 함수명 : fn_addInfo 
        * 내  용 : 등록(트랜잭션)
        ****************************************************/
        this.fn_addInfo = function() {
        	var strSvcId = "insertEmployees";
        	var strSvcUrl = "http://localhost:8080/insertEmployees";
        	var inData = "inDataset=ds_emp_copy"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Add";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        /***************************************************
        * 함수명 : fn_Callback_Add 
        * 내  용 : (콜백) 모달창 닫고 재조회
        ****************************************************/
        this.fn_Callback_Add = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		this.close();
        		if(this.opener && typeof this.opener.btn_search_onclick === 'function') {
        			alert("저장이 완료되었습니다.");
        			this.opener.btn_search_onclick();
        		}
        	} 
        }

        
        /***************************************************
        * 함수명 : btn_update_onclick 
        * 내  용 : 수정 버튼(기존 정보 수정), 필드값, 유효성체크
        ****************************************************/
        this.btn_update_onclick = function(obj,e)
        {	
        	var rowType = this.ds_emp_copy.getRowType();
        	
        	if(rowType == 1) {
        		alert("수정된 사항이 없습니다.");
        		return;
        	}
        	
        	// 필수 필드 값 확인
            var firstName = this.ds_emp_copy.getColumn(0, "FIRST_NAME");
            var lastName = this.ds_emp_copy.getColumn(0, "LAST_NAME");
            var email = this.ds_emp_copy.getColumn(0, "EMAIL");
            var emailDomain = this.ds_emp_copy.getColumn(0, "EMAIL_DOMAIN");
            var phone = this.ds_emp_copy.getColumn(0, "PHONE");
            var managerId = this.ds_emp_copy.getColumn(0, "MANAGER_ID");
            var jobTitle = this.ds_emp_copy.getColumn(0, "JOB_TITLE");
            var hireDate = this.ds_emp_copy.getColumn(0, "HIRE_DATE");
            
            // 유효성 검사 및 알림 표시
        	if (!managerId) {
        		if(jobTitle != "PRESIDENT"){
        			alert("관리자를 선택해 주세요.");
        			return;
        		}
        	}
            if (!firstName) {
                alert("First Name 을 입력해 주세요.");
                return;
            }
            if (!lastName) {
                alert("Last Name 을 입력해 주세요.");
                return;
            }
            if (!jobTitle || jobTitle == "- 선택 -") {
                alert("직책을 선택해 주세요.");
                return;
            }
            if (!email) {
                alert("이메일을 입력해 주세요.");
                return;
            }
            if (!emailDomain || emailDomain == "- 선택 -") {
                alert("이메일 도메인을 선택해주세요.");
                return;
            }
            if (!hireDate) {
                alert("고용일을 입력해 주세요.");
                return;
            }
            if (!phone) {
                alert("전화번호를 입력해 주세요.");
                return;
            }
            
            var result = application.confirm("정말로 수정하시겠습니까?","TEST","warning");
        	if (result) {
        		this.fn_updateInfo();
        	} else {
        		trace("수정 작업 취소");
        	}
        	
        }
        /***************************************************
        * 함수명 : fn_addInfo 
        * 내  용 : 수정(트랜잭션)
        ****************************************************/
        this.fn_updateInfo = function()
        {
        	var strSvcId = "update";
        	var strSvcUrl = "http://localhost:8080/update";
        	var inData = "inDataset=ds_emp_copy"
        	var outData = "ds_emp_copy=outDataset, ds_mgr2=outDataset2";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Update";
        	 
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        /***************************************************
        * 함수명 : fn_Callback_Update 
        * 내  용 : (콜백) 수정시 모달창 닫기, 재조회
        ****************************************************/
        this.fn_Callback_Update = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		if(this.opener && typeof this.opener.btn_search_onclick === 'function') {
        			alert("수정이 완료되었습니다.");
        			this.opener.fn_loadMgrJobData();
        			this.opener.btn_search_onclick();
        		}
        		this.loadMgrData();
        	}
        }

        this.loadMgrData = function(){
        	var strSvcId = "managerInfo";
        	var strSvcUrl = "http://localhost:8080/mgrInfo";
        	var inData = ""
        	var outData = "ds_mgr2=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_callback_loadMgrInfo";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        this.fn_callback_loadMgrInfo = function(){
        	var existingManagerId = this.ds_mgr2.getColumn(0, "MANAGER_ID");

        		if (existingManagerId !== "") {
                    var newRow = this.ds_mgr2.insertRow(0);
                    this.ds_mgr2.setColumn(newRow, "MANAGER_ID", "");
                    this.ds_mgr2.setColumn(newRow, "FIRST_NAME", "- 선택 -");
                }
        }

        
        /***************************************************
        * 함수명 : onchanged 
        * 내  용 : 각필드 수정 및 입력값 ds_emp 데이터 셋에 셋팅
        ****************************************************/
        this.edt_Fname_onchanged = function(obj,e)
        {
        	var newFname = obj.value;
        	this.ds_emp_copy.setColumn(0, "FIRST_NAME", newFname);
        }
        this.edt_Lname_onchanged = function(obj,e)
        {
        	var newLname = obj.value;
        	this.ds_emp_copy.setColumn(0, "LAST_NAME", newLname);
        }
        this.edt_email_onchanged = function(obj,e)
        {
        	var newEmail = obj.value;
        	this.ds_emp_copy.setColumn(0, "EMAIL", newEmail);
        }
        this.cbo_email_onitemchanged = function(obj,e)
        {
        	var newEdomain = obj.value;
        	this.ds_emp_copy.setColumn(0, "EMAIL_DOMAIN", newEdomain);
        }
        // 전화번호 포맷팅
        this.edt_phone_ontextchanged = function(obj,e)
        {
        	var rawValue = obj.value.replace(/\D/g, '');
        	var formattedValue = '';

            if (rawValue.length > 3) {
                formattedValue += rawValue.substring(0, 3) + '-';
                if (rawValue.length > 7) {
                    formattedValue += rawValue.substring(3, 7) + '-';
                    formattedValue += rawValue.substring(7, 11);
                } else {
                    formattedValue += rawValue.substring(3);
                }
            } else {
                formattedValue = rawValue;
            }
            // 포맷된 값을 EditBox에 설정
            obj.set_value(formattedValue);
        }
        this.edt_phone_onchanged = function(obj,e)
        {
        	var newPhone = obj.value;
        	this.ds_emp_copy.setColumn(0, "PHONE", newPhone);
        }
        this.cbo_mgr_onitemchanged = function(obj,e)
        {
        	var newMgr = obj.value;
        	var row = this.ds_mgr2.findRow("MANAGER_ID", newMgr);
        	if (row>=0) {
        		  var MgrId = this.ds_mgr2.getColumn(row, "MANAGER_ID");
        		  this.ds_emp_copy.addColumn("MANAGER_ID","INT");
        		  this.ds_emp_copy.setColumn(0, "MANAGER_ID", MgrId)
        		} 
        }
        this.cbo_job_onitemchanged = function(obj,e)
        {
        	var newJob = obj.value;
        	if(newJob == "PRESIDENT") {
        		this.ds_emp_copy.setColumn(0, "MANAGER_ID", "");
        		this.cbo_mgr.set_enable(false);
        	} else {
        		this.cbo_mgr.set_index(0);
        		this.cbo_mgr.set_enable(true);
        	}
        	this.ds_emp_copy.setColumn(0, "JOB_TITLE", newJob);
        	
        }
        this.cal_hireDate_onchanged = function(obj,e)
        {
        	var newHdate = obj.value;
        	this.ds_emp_copy.setColumn(0, "HIRE_DATE", newHdate);
        }

        
        /***************************************************
        * 함수명 : btn_delete_onclick
        * 내  용 : 삭제 버튼
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
        * 내  용 : 삭제(트랜잭션)
        ****************************************************/
        this.fn_deleteInfo = function()
        {
        	var strSvcId = "delete";
        	var strSvcUrl = "http://localhost:8080/delete";
        	var inData = "inDataset=ds_emp_copy"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Delete";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }
        /***************************************************
        * 함수명 : fn_Callback_Delete
        * 내  용 : (콜백) 삭제 후 팝업 종료, 재조회
        ****************************************************/
        this.fn_Callback_Delete = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		this.close();
        		// 팝업 종료 후 부모폼 서치 트랜잭션 수행
        		if(this.opener && typeof this.opener.btn_search_onclick === 'function') {
        			alert("삭제가 완료되었습니다.");
        			this.opener.btn_search_onclick();
        		}
        	}
        }

        /***************************************************
        * 함수명 : modal_emp_onclose
        * 내  용 : 모달이 닫힐 때 데이터 셋 초기화
        ****************************************************/
        this.modal_emp_onclose = function(obj,e)
        {
        	this.ds_emp.clearData();
        }

        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.modal_emp_onload, this);
            this.addEventHandler("onclose", this.modal_emp_onclose, this);
            this.Static00.addEventHandler("onclick", this.Static00_onclick, this);
            this.Static02.addEventHandler("onclick", this.Static02_onclick, this);
            this.Static06.addEventHandler("onclick", this.Static06_onclick, this);
            this.modal_id.addEventHandler("oneditclick", this.Edit00_oneditclick, this);
            this.edt_Fname.addEventHandler("onchanged", this.edt_Fname_onchanged, this);
            this.edt_email.addEventHandler("oneditclick", this.modal_email_oneditclick, this);
            this.edt_email.addEventHandler("onchanged", this.edt_email_onchanged, this);
            this.edt_phone.addEventHandler("oneditclick", this.Edit03_oneditclick, this);
            this.edt_phone.addEventHandler("ontextchanged", this.edt_phone_ontextchanged, this);
            this.edt_phone.addEventHandler("onchanged", this.edt_phone_onchanged, this);
            this.cbo_mgr.addEventHandler("onitemchanged", this.cbo_mgr_onitemchanged, this);
            this.cbo_job.addEventHandler("onitemchanged", this.cbo_job_onitemchanged, this);
            this.cal_hireDate.addEventHandler("onchanged", this.cal_hireDate_onchanged, this);
            this.edt_Lname.addEventHandler("oneditclick", this.modal_Lname_oneditclick, this);
            this.edt_Lname.addEventHandler("onchanged", this.edt_Lname_onchanged, this);
            this.cbo_email.addEventHandler("onitemchanged", this.cbo_email_onitemchanged, this);
            this.Div00.btn_update.addEventHandler("onclick", this.btn_update_onclick, this);
            this.Div00.btn_save.addEventHandler("onclick", this.btn_save_onclick, this);
            this.Div00.btn_delete.addEventHandler("onclick", this.btn_delete_onclick, this);

        };

        this.loadIncludeScript("modal_emp.xfdl", true);

       
    };
}
)();
