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
                this.set_name("wharehouse");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1002,670);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_house", this);
            obj._setContents("<ColumnInfo><Column id=\"CHECK\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION\" type=\"STRING\" size=\"256\"/><Column id=\"WAREHOUSE_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"ROWTYPE\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_region", this);
            obj._setContents("<ColumnInfo><Column id=\"REGION_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_country", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNTRY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_location", this);
            obj._setContents("<ColumnInfo><Column id=\"LOCATION_ID\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_cond", this);
            obj._setContents("<ColumnInfo><Column id=\"condRegion\" type=\"STRING\" size=\"256\"/><Column id=\"condCountry\" type=\"STRING\" size=\"256\"/><Column id=\"condLocation\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_region_grd", this);
            obj._setContents("<ColumnInfo><Column id=\"REGION_ID\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_country_grd", this);
            obj._setContents("<ColumnInfo><Column id=\"COUNTRY_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"REGION_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_location_grd", this);
            obj._setContents("<ColumnInfo><Column id=\"LOCATION_ID\" type=\"STRING\" size=\"256\"/><Column id=\"LOCATION_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"COUNTRY_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_cond", "absolute", "20", "44", null, "36", "20", null, this);
            obj.set_taborder("17");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("st_region", "absolute", "4", "8", "80", "20", null, null, this.div_cond);
            obj.set_taborder("0");
            obj.set_text("지역");
            obj.style.set_align("right middle");
            obj.style.set_font("9 Dotum");
            this.div_cond.addChild(obj.name, obj);
            obj = new Combo("cbo_region", "absolute", "89", "8", "183", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("1");
            obj.set_innerdataset("@ds_region");
            obj.set_datacolumn("REGION_NAME");
            obj.set_codecolumn("REGION_ID");
            obj = new Static("st_country", "absolute", "282", "8", "80", "20", null, null, this.div_cond);
            obj.set_taborder("2");
            obj.set_text("국가");
            obj.style.set_align("right middle");
            obj.style.set_font("9 Dotum");
            this.div_cond.addChild(obj.name, obj);
            obj = new Combo("cbo_country", "absolute", "367", "8", "183", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("3");
            obj.set_innerdataset("@ds_country");
            obj.set_codecolumn("COUNTRY_ID");
            obj.set_datacolumn("COUNTRY_NAME");
            obj = new Static("st_location", "absolute", "577", "8", "80", "20", null, null, this.div_cond);
            obj.set_taborder("4");
            obj.set_text("창고위치");
            obj.style.set_align("right middle");
            obj.style.set_font("9 Dotum");
            this.div_cond.addChild(obj.name, obj);
            obj = new Combo("cbo_location", "absolute", "662", "8", "183", "20", null, null, this.div_cond);
            this.div_cond.addChild(obj.name, obj);
            obj.set_taborder("5");
            obj.set_innerdataset("@ds_location");
            obj.set_datacolumn("LOCATION_NAME");
            obj.set_codecolumn("LOCATION_ID");

            obj = new Static("st_title", "absolute", "20", "10", null, "37", "48.84%", null, this);
            obj.set_taborder("0");
            obj.set_text("▣ 창고 목록");
            obj.style.set_background("transparent");
            obj.style.set_font("bold 16 Dotum");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_houselist", "absolute", "20", "85", null, null, "20", "20", this);
            obj.set_taborder("16");
            obj.set_binddataset("ds_house");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"96\"/><Column size=\"103\"/><Column size=\"149\"/><Column size=\"231\"/><Column size=\"203\"/><Column size=\"180\"/><Column size=\"0\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" text=\"0\"/><Cell col=\"1\" text=\"관리번호\"/><Cell col=\"2\" displaytype=\"normal\" edittype=\"combo\" text=\"지역\"/><Cell col=\"3\" edittype=\"combo\" text=\"국가\"/><Cell col=\"4\" edittype=\"combo\" text=\"창고위치\"/><Cell col=\"5\" edittype=\"text\" text=\"창고명\"/><Cell col=\"6\" text=\"rowtype\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" text=\"bind:CHECK\"/><Cell col=\"1\" text=\"bind:WAREHOUSE_ID\"/><Cell col=\"2\" displaytype=\"normal\" edittype=\"expr:dataset.getRowType(currow) == 2 ? 'combo' : 'none'\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:REGION\" combodataset=\"ds_region_grd\" combocodecol=\"REGION_NAME\" combodatacol=\"REGION_NAME\" combodisplayrowcount=\"-1\"/><Cell col=\"3\" edittype=\"expr:dataset.getRowType(currow) == 2 ? 'combo' : 'none'\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:COUNTRY\" combodataset=\"ds_country_grd\" combocodecol=\"COUNTRY_NAME\" combodatacol=\"COUNTRY_NAME\"/><Cell col=\"4\" edittype=\"expr:dataset.getRowType(currow) == 2 ? 'combo' : 'none'\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:LOCATION\" combodataset=\"ds_location_grd\" combocodecol=\"LOCATION_NAME\" combodatacol=\"LOCATION_NAME\"/><Cell col=\"5\" edittype=\"text\" style=\"align:left;padding:0 0 0 3;\" text=\"bind:WAREHOUSE_NAME\" editlimit=\"80\"/><Cell col=\"6\" text=\"expr:dataset.getRowType(currow)\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("div_top", "absolute", null, "14", "471", "28", "0", null, this);
            obj.set_taborder("18");
            this.addChild(obj.name, obj);
            obj = new Button("btn_reset", "absolute", null, "2", "25", "24", "268", null, this.div_top);
            obj.set_taborder("0");
            obj.style.set_image("URL('theme://hiclipart.com (1).png')");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0solid solid #999999ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_search", "absolute", null, "2", "60", "24", "206", null, this.div_top);
            obj.set_taborder("1");
            obj.set_text("조회");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0solid solid #999999ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_add", "absolute", null, "2", "60", "24", "144", null, this.div_top);
            obj.set_taborder("2");
            obj.set_text("추가");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0solid solid #999999ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_save", "absolute", null, "2", "60", "24", "82", null, this.div_top);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("1 solid #999999ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);
            obj = new Button("btn_delete", "absolute", null, "2", "60", "24", "20", null, this.div_top);
            obj.set_taborder("4");
            obj.set_text("삭제");
            obj.style.set_background("#4f81bdff");
            obj.style.set_border("0 solid #808080ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_font("9 Dotum");
            obj.style.set_cursor("hand");
            this.div_top.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "150", "20", "80", "20", null, null, this);
            obj.set_taborder("19");
            obj.set_text("MENULIST");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 36, this.div_cond,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("17");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.div_cond.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 388, 37, this.div_top,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("18");

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
            obj = new BindItem("item0","Div00.cbo_region","value","ds_cond","condRegion");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","Div00.cbo_country","value","ds_cond","condCountry");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","Div00.cbo_location","value","ds_cond","condLocation");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","div_cond.cbo_region","value","ds_cond","condRegion");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","div_cond.cbo_country","value","ds_cond","condCountry");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","div_cond.cbo_location","value","ds_cond","condLocation");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("wharehouse.xfdl", function(exports) {
        /*
        화면명 : 창고 목록 조회 수정 저장 삭제 
        작성자 : 김진한
        작성일자 : 2024/09/10
        */

        this.isLoading = true;
        /***************************************************
        * 함수명 : wharehouse_onload (팝업 로드)
        * 내  용 : loadData(트랜잭션 호출), div_top_search_btn_onclick(조회)
        ****************************************************/
        this.wharehouse_onload = function(obj,e)
        {	
        	this.loadData();
        	this.div_top_search_btn_onclick();
        }

        /***************************************************
        * 함수명 : loadData 
        * 내  용 : 데이터 로드(트랜잭션 호출)
        ****************************************************/
        this.loadData = function(){

        	var strSvcId = "loadBasicData";
        	var strSvcUrl = "http://localhost:8080/basicData";
        	var inData = ""
        	var outData = "ds_region=outDataset, ds_region_grd=outDataset, ds_country=outDataset2, ds_country_grd=outDataset2, ds_location=outDataset3, ds_location_grd=outDataset3";
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
        		
        		var existingRegion = this.ds_region.getColumn(0, "REGION_NAME");
        		var existingCountry = this.ds_country.getColumn(0, "COUNTRY_NAME");
        		var existingLocation = this.ds_location.getColumn(0, "LOCATION_NAME");
        		
        		if (existingRegion !== "- 전체 -") {
                    var newRow = this.ds_region.insertRow(0);
                    this.ds_region.setColumn(newRow, "REGION_ID", 0);
                    this.ds_region.setColumn(newRow, "REGION_NAME", "- 전체 -");
                }
                if (existingCountry !== "- 전체 -") {
        			var newRow = this.ds_country.insertRow(0);
        			this.ds_country.setColumn(newRow, "COUNTRY_ID", "");
        			this.ds_country.setColumn(newRow, "COUNTRY_NAME", "- 전체 -");
        			this.ds_country.setColumn(newRow, "REGION_ID", 0);
                }
                if (existingLocation !== "- 전체 -") {
        			var newRow = this.ds_location.insertRow(0);
        			this.ds_location.setColumn(newRow, "LOCATION_ID", 0);
        			this.ds_location.setColumn(newRow, "LOCATION_NAME", "- 전체 -");
        			this.ds_location.setColumn(newRow, "COUNTRY_ID", 0);
                }
                
                this.div_cond.cbo_region.set_index(0);
                this.div_cond.cbo_country.set_index(0);
                this.div_cond.cbo_location.set_index(0);
                
                var existingRegion_grd = this.ds_region_grd.getColumn(0, "REGION_NAME");
        		var existingCountry_grd = this.ds_country_grd.getColumn(0, "COUNTRY_NAME");
        		var existingLocation_grd = this.ds_location_grd.getColumn(0, "LOCATION_NAME");
        		
                if (existingRegion_grd !== "- 선택 -") {
                    var newRow = this.ds_region_grd.insertRow(0);
                    this.ds_region_grd.setColumn(newRow, "REGION_ID", 0);
                    this.ds_region_grd.setColumn(newRow, "REGION_NAME", "- 선택 -");
                }
                if (existingCountry_grd !== "- 선택 -") {
        			var newRow = this.ds_country_grd.insertRow(0);
        			this.ds_country_grd.setColumn(newRow, "COUNTRY_ID", "");
        			this.ds_country_grd.setColumn(newRow, "COUNTRY_NAME", "- 선택 -");
        			this.ds_country_grd.setColumn(newRow, "REGION_ID", 0);
                }
                if (existingLocation_grd !== "- 선택 -") {
        			var newRow = this.ds_location_grd.insertRow(0);
        			this.ds_location_grd.setColumn(newRow, "LOCATION_ID", 0);
        			this.ds_location_grd.setColumn(newRow, "LOCATION_NAME", "- 선택 -");
        			this.ds_location_grd.setColumn(newRow, "COUNTRY_ID", 0);
                }
        		
        	}
        }

        
        /***************************************************
        * 함수명 : div_top_search_btn_onclick 
        * 내  용 : 조회 버튼 클릭
        ****************************************************/
        this.div_top_search_btn_onclick = function(obj,e)
        {
        	this.fn_search();
        }

        /***************************************************
        * 함수명 : fn_search 
        * 내  용 : 조회 트랜잭션
        ****************************************************/
        this.fn_search = function() {

        	var strSvcId = "loadWareHouseInfo";
        	var strSvcUrl = "http://localhost:8080/warehouseInfo";
        	var inData = "inDataset=ds_cond"
        	var outData = "ds_house=outDataset";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Search";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_Search
        * 내  용 : (콜백)
        ****************************************************/
        this.fn_Callback_Search = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
         		this.ds_house.addColumn("CHECK", "STRING");
        /*		var rowCount = this.ds_house.getRowCount();*/
        // 			for (var i = 0; i < rowCount; i++) {
        // 				this.ds_house.setColumn(i, "CHECK", 0);
        // 			}
        		this.isLoading = false;
        	}
        }

        
        /***************************************************
        * 함수명 : grd_houselist_oncellclick 
        * 내  용 : 셀 클릭시(체크컬럼만) 체크 상태 값 변경
        ****************************************************/
        this.grd_houselist_oncellclick = function(obj,e)
        { 	
        	var cell = e.cell
        	var row = e.row
        	if(cell == 0){
        		var currentValue = this.ds_house.getColumn(row, "CHECK");
        		if(this.ds_house.getColumn(row, "CHECK") == 1){
        			trace("체크표시");
        			this.ds_house.setColumn(row, "CHECK", 1);
        		} else {
        			trace("체크해제");
        			this.ds_house.setColumn(row, "CHECK", "");
        		}
        	}
        }

        
        /***************************************************
        * 함수명 : div_top_addbtn_onclick
        * 내  용 : 그리드 행 추가 버튼
        ****************************************************/
        this.div_top_addbtn_onclick = function(obj,e)
        {
        	var newRow = this.ds_house.addRow(); // 행 추가
        	if(newRow >= 0) {
        		this.ds_house.setColumn(newRow, "CHECK", "0") // 기본값 셋팅
        		this.ds_house.setColumn(newRow, "REGION", "- 선택 -")
        		this.ds_house.setColumn(newRow, "COUNTRY", "- 선택 -")
        		this.ds_house.setColumn(newRow, "LOCATION", "- 선택 -")
        	}
        }

        
        /***************************************************
        * 함수명 : div_top_save_btn_onclick
        * 내  용 : 그리드 내 추가 및 수정된 사항 저장 함수
        ****************************************************/
        this.div_top_save_btn_onclick = function(obj,e)
        {	
        	var row = this.ds_house.getRowCount();
        	
        	var isValid = this.fn_checkVal();
        	if(isValid) {
        		var result = application.confirm("정말로 저장하시겠습니까?","TEST","warning");
        		if (result) {
        		
        			for(i=0; i<row; i++) {
        				var rowType = this.ds_house.getRowType();
        				trace(rowType);
        				if(rowType=2) {
        					this.ds_house.setColumn(i, "ROWTYPE", 2);
        				} else if(rowType=4) {
        					this.ds_house.setColumn(i, "ROWTYPE", 4);
        				}
        			}
        			
        			this.fn_save();
        			
        		} else {
        			trace("저장 작업 취소");
        		}
        	}
        }

        /***************************************************
        * 함수명 : fn_save
        * 내  용 : 저장 트랜잭션
        ****************************************************/
        this.fn_save = function(){

        	var strSvcId = "upsertInfo";
        	var strSvcUrl = "http://localhost:8080/upsertInfo";
        	var inData = "inDataset=ds_house"
        	var outData = "";
        	var strAvg = "";
        	var callBackFnc = "fn_Callback_Save";
        	
        	this.transaction(strSvcId, strSvcUrl, inData, outData, strAvg, callBackFnc);
        }

        /***************************************************
        * 함수명 : fn_Callback_Save
        * 내  용 : 콜백
        ****************************************************/
        this.fn_Callback_Save = function(strSvcId,nErrorCode,strErrorMsg) {
        	if(nErrorCode == 0) {
        		alert("저장이 완료되었습니다.");
        		this.div_top_search_btn_onclick();
        	}
        }

        
        /***************************************************
        * 함수명 : fn_checkVal
        * 내  용 : 저장 시 유효성 검사 함수
        ****************************************************/
        this.fn_checkVal = function() {
        	var rowCount = this.ds_house.getRowCount();
        	var hasCheckedItems = false; // 선택된 항목이 있는지 없는지
        	var missingFields = []; // 입력이 안된 값 배열에 추가
        	var rowPosition = 0;
            for (var i = 0; i < rowCount; i++) {
                var checkValue = this.ds_house.getColumn(i, "CHECK");
                
                // "CHECK" 값이 1인 경우에만 유효성 검사
              
        			hasCheckedItems = true;
        						
                    var regionInfo = this.ds_house.getColumn(i, "REGION");
                    var countryInfo = this.ds_house.getColumn(i, "COUNTRY");
                    var locationInfo = this.ds_house.getColumn(i, "LOCATION");
                    var warehouseInfo = this.ds_house.getColumn(i, "WAREHOUSE_NAME");
                    
                    // 필수 필드 값 확인
                    if (!regionInfo || regionInfo == "- 선택 -") {
        				rowPosition = i;
                        missingFields.push("지역");
                    }
                    if (!countryInfo || countryInfo == "- 선택 -") {
        				rowPosition = i;
                        missingFields.push("국가");
                    }
                    if (!locationInfo || locationInfo == "- 선택 -") {
        				rowPosition = i;
                        missingFields.push("위치");
                    }
                    if (!warehouseInfo) {
        				rowPosition = i;
                        missingFields.push("창고명");
                    }
                    if (rowPosition > 0) {
        				break;
                    }
            }
            
            // 체크된 항목이 없는 경우
        //     if (!hasCheckedItems) {
        //         alert("선택된 항목이 존재하지 않습니다.");
        //         return false;
        //     }
            
            // 필수 필드 누락이 있는 경우
            if (missingFields.length > 0) {
                var message = "다음 정보가 입력되지 않았습니다 : " + missingFields.join(", ");
                this.ds_house.set_rowposition(rowPosition);
                alert(message);
                return false;
            }
            
        	return true;
        }

        
        /***************************************************
        * 함수명 : grd_houselist_onheadclick
        * 내  용 : 헤드영역 체크박스 클릭시 전체 체크 및 해제
        ****************************************************/
        this.grd_houselist_onheadclick = function(obj,e)
        {
        	var test = obj.getCellProperty("head", e.col, "text");
        	trace(test);
        	if(e.col == 0) {
        		if(obj.getCellProperty("head", e.col, "text") == 0) {
        			obj.setCellProperty("head", e.col, "text", 1);
        		} else {
        			obj.setCellProperty("head", e.col, "text", "");
        		}
        		var checkStatus = obj.getCellProperty("head", e.col, "text");
        	}
        	
        	var rowCount = this.ds_house.getRowCount();
        	for (var i = 0; i < rowCount ; i++) {
        		this.ds_house.setColumn(i, "CHECK", checkStatus);
        	}
        }

        
        /***************************************************
        * 함수명 : ds_house_oncolumnchanged 
        * 내  용 : 데이터셋 변경시 체크값 설정
        ****************************************************/
        this.ds_house_oncolumnchanged = function(obj,e)
        {	
        	var row = e.row
        	if( e.row >= 0) {
        		var regionName = this.ds_house.getColumn(e.row, "REGION");
        		var countryName = this.ds_house.getColumn(e.row, "COUNTRY");
        		
        		var regionId = this.findRegionIdByValue(regionName);
        		var countryId = this.findCountryIdByValue(countryName);
        		trace(e.col);
        		if(e.col == 2){
        			// 필터 데이터 셋 2개 로 나누기 region영역 country, location 필터
        			this.filterCountryDatasetGrid(regionId, row);
        		}else if(e.col == 3){
        			// country 영역 -- location필터
        			this.filterLocationDatasetGrid(countryId, row);
        		}
        		
        		//this.filterDataset(regionId, countryId, row);
        	}

        	if (e.row >= 0) {  
                var columnId = e.col;  
                var newValue = e.newvalue;
                var oldValue = this.ds_house.getOrgColumn(e.row, columnId);
        		// 로딩중엔 oncolumnchanged함수 수행 x
                if (this.isLoading) {
                    return;
                }
        //         // CHECK 컬럼에 대해서는 수행하지 않음
        //         if(columnId != 5) {
        // 			if (oldValue != newValue) {
        // 				 obj.setColumn(e.row, "CHECK", 1);
        // 			}
        // 		}
            }
        }

        /***************************************************
        * 함수명 : findRegionIdByValue
        * 내  용 : VALUE값에 맞는 지역 ID 찾기
        // ****************************************************/
        this.findRegionIdByValue = function(regionValue) {
            var regionId = null;
        	
            // 데이터셋에서 각 행을 순회하며 regionValue와 일치하는 regionId 찾기
            for (var i = 0; i < this.ds_region_grd.getRowCount(); i++) {
                var value = this.ds_region_grd.getColumn(i, "REGION_NAME"); // 지역 이름
                if (value === regionValue) {
                    regionId = this.ds_region_grd.getColumn(i, "REGION_ID");  
                    break;
                }
            }
            return regionId;
        };

        /***************************************************
        * 함수명 : findRegionIdByValue
        * 내  용 : VALUE값에 맞는 국가 ID 찾기
        ****************************************************/
        this.findCountryIdByValue = function(countryValue) {
            var countryId = null;
        	
            // 데이터셋에서 각 행을 순회하며 regionValue와 일치하는 country 찾기
            for (var i = 0; i < this.ds_country_grd.getRowCount(); i++) {
                var value = this.ds_country_grd.getColumn(i, "COUNTRY_NAME"); // 국가 이름
                if (value === countryValue) {
                    countryId = this.ds_country_grd.getColumn(i, "COUNTRY_ID");  
                    break;
                }
            }
            return countryId;
        };

        /***************************************************
        * 함수명 : filterLocationDatasetGrid
        * 내  용 : 지역 데이터셋 - 국가 데이터셋 연관관계 설정 (그리드용)
        ****************************************************/
        this.filterCountryDatasetGrid = function(regionId,row){
        	this.ds_country.set_enableevent(false);
        	this.ds_location.set_enableevent(false);
        	
        	var filterExprCountry = "REGION_ID == '" + regionId + "' || REGION_ID == " + 0;
        	if (regionId == 0) {
        		this.ds_house.setColumn(row, "COUNTRY", "- 선택 -");
        		this.ds_house.setColumn(row, "LOCATION", "- 선택 -");
        		this.ds_country_grd.filter("");
        		this.ds_location_grd.filter("");
        	} else {
        		this.ds_country_grd.filter(filterExprCountry);
        		
        		var countryIds = [];
        		
        		// 필터링된 국가 데이터셋에서 regionId에 맞는 countryId 뽑아서 배열에 저장
                for (var i = 0; i < this.ds_country_grd.getRowCount(); i++) {
                    var countryId = this.ds_country_grd.getColumn(i, "COUNTRY_ID"); 
                    var countryRegionId = this.ds_country_grd.getColumn(i, "REGION_ID");
                    
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
        			this.ds_location_grd.filter(filterExprLocation);
                } else {
        			this.ds_location_grd.filter("");
                }
        	}

        	this.ds_country_grd.set_enableevent(true);
        	this.ds_location_grd.set_enableevent(true);
        }

        /***************************************************
        * 함수명 : filterLocationDatasetGrid
        * 내  용 : 국가 데이터셋 - 위치 데이터셋 연관관계 설정 (그리드용)
        ****************************************************/
        this.filterLocationDatasetGrid = function(countryId){
        	this.ds_location_grd.set_enableevent(false);
        	
        	trace(countryId);
        	var filterExprLocation = "COUNTRY_ID == '" + countryId + "' || COUNTRY_ID == " + 0;
        	if (countryId == 0) {
        		this.ds_house.setColumn(row, "LOCATION", "- 선택 -");
        		this.ds_location_grd.filter("");
        	} else {
        		this.ds_location_grd.filter(filterExprLocation);
        	}
        	
        	this.ds_location_grd.set_enableevent(true);
        }

        
        /***************************************************
        * 함수명 : div_cond_cbo_region_onitemchanged, filterCountryDataset
        * 내  용 : 지역 데이터셋 - 국가 데이터셋 연관관계 설정 
        ****************************************************/
        this.div_cond_cbo_region_onitemchanged = function(obj,e)
        {	
        	var selectedRegionId = obj.value;
        	this.div_cond.cbo_country.set_index(0);
        	this.div_cond.cbo_location.set_index(0);
        	this.filterCountryDataset(selectedRegionId);
        		
        }
        this.filterCountryDataset = function (regionId) {
        	this.ds_country.set_enableevent(false);
        	this.ds_location.set_enableevent(false);
        	
        	var filterExprCountry = "REGION_ID == '" + regionId + "' || REGION_ID == 0";
        	
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
        				filterExprLocation += "COUNTRY_ID == '" + countryIds[i] + "' || COUNTRY_ID == 0";
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
        * 함수명 : div_cond_cbo_region_onitemchanged, filterLocationDataset
        * 내  용 : 국가 데이터셋 - 위치 데이터셋 연관관계 설정
        ****************************************************/
        this.div_cond_cbo_country_onitemchanged = function(obj,e)
        {
        	var selectedCountryId = obj.value;
        	this.div_cond.cbo_location.set_index(0);
        	this.filterLocationDataset(selectedCountryId);
            
        }
        this.filterLocationDataset = function (countryId) {
        	this.ds_location.set_enableevent(false);
        	var filterExprLocation = "COUNTRY_ID == '" + countryId + "' || COUNTRY_ID == 0";
        	if (countryId == 0) {
        		this.ds_location.filter("");
        	} else {
        		this.ds_location.filter(filterExprLocation);
        	}
        	this.ds_location.set_enableevent(true);
        }

        
        /***************************************************
        * 함수명 : div_top_reset_btn_onclick
        * 내  용 : 조건 데이터셋 초기화 함수
        ****************************************************/
        this.div_top_reset_btn_onclick = function(obj,e)
        {
        	this.div_cond.cbo_region.set_index(0);
        	this.div_cond.cbo_country.set_index(0);
        	this.div_cond.cbo_location.set_index(0);
        }

        
        /***************************************************
        * 함수명 : div_top_delete_btn_onclick 
        * 내  용 : 삭제 버튼 클릭 및 안내 문구
        ****************************************************/
        this.div_top_delete_btn_onclick = function(obj,e)
        {
        	IsChecked = this.fn_existCheck();
        	if(!IsChecked){
        		alert("선택된 값이 없습니다.");
        	}
        	
        	if(IsChecked){
        		var result = application.confirm("정말로 삭제하시겠습니까?","warning","warning");
        		if (result) {
        			this.fn_deleteWarehouseInfo();
        		} else {
        			trace("삭제 작업 취소");
        		}
        	}	
        }

        /***************************************************
        * 함수명 : fn_existCheck 
        * 내  용 : 체크상태 유효성 검사
        ****************************************************/
        this.fn_existCheck = function()
        {
        	row = this.ds_house.getRowCount();
        	var checked = false;
        	for (var i = 0; i < row; i++) {
                var checkStatus = this.ds_house.getColumn(i, "CHECK"); 
                if (checkStatus == 1) {
        			checked = true;
                    break;
                }
            }
        	return checked;
        }

        /***************************************************
        * 함수명 : fn_deleteWarehouseInfo 
        * 내  용 : 삭제 트랜잭션
        ****************************************************/
        this.fn_deleteWarehouseInfo = function()
        {
        	var strSvcId = "delete";
        	var strSvcUrl = "http://localhost:8080/deleteWarehouse";
        	var inData = "inDataset=ds_house"
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
        		alert("삭제가 완료되었습니다.");
        		this.div_top_search_btn_onclick();
        	}
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
            this.ds_house.addEventHandler("oncolumnchanged", this.ds_house_oncolumnchanged, this);
            this.addEventHandler("onload", this.wharehouse_onload, this);
            this.div_cond.cbo_region.addEventHandler("onitemchanged", this.div_cond_cbo_region_onitemchanged, this);
            this.div_cond.cbo_country.addEventHandler("onitemchanged", this.div_cond_cbo_country_onitemchanged, this);
            this.st_title.addEventHandler("onclick", this.Static00_onclick, this);
            this.grd_houselist.addEventHandler("onheadclick", this.grd_houselist_onheadclick, this);
            this.grd_houselist.addEventHandler("oncellclick", this.grd_houselist_oncellclick, this);
            this.grd_houselist.addEventHandler("ontextchanged", this.grd_houselist_ontextchanged, this);
            this.grd_houselist.addEventHandler("onselectchanged", this.grd_houselist_onselectchanged, this);
            this.div_top.btn_reset.addEventHandler("onclick", this.div_top_reset_btn_onclick, this);
            this.div_top.btn_search.addEventHandler("onclick", this.div_top_search_btn_onclick, this);
            this.div_top.btn_add.addEventHandler("onclick", this.div_top_addbtn_onclick, this);
            this.div_top.btn_save.addEventHandler("onclick", this.div_top_save_btn_onclick, this);
            this.div_top.btn_delete.addEventHandler("onclick", this.div_top_delete_btn_onclick, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);

        };

        this.loadIncludeScript("wharehouse.xfdl", true);

       
    };
}
)();
