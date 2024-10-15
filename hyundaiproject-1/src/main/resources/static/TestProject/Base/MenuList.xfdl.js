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
                this.set_name("MenuList");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("div_menulist", "absolute", "0", "0", null, null, "0", "0", this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);
            obj = new Button("btn_pivot", "absolute", "468", "161", "184", "103", null, null, this.div_menulist);
            obj.set_taborder("0");
            obj.set_text("피벗테이블");
            this.div_menulist.addChild(obj.name, obj);

            obj = new Button("btn_emp", "absolute", "40", "25", "184", "103", null, null, this);
            obj.set_taborder("0");
            obj.set_text("직원목록");
            this.addChild(obj.name, obj);

            obj = new Button("btn_warehouse", "absolute", "254", "25", "184", "103", null, null, this);
            obj.set_taborder("1");
            obj.set_text("창고목록");
            this.addChild(obj.name, obj);

            obj = new Button("btn_categoryProduct", "absolute", "42", "161", "184", "103", null, null, this);
            obj.set_taborder("2");
            obj.set_text("카테고리별상품목록");
            this.addChild(obj.name, obj);

            obj = new Button("btn_inventory", "absolute", "468", "25", "184", "103", null, null, this);
            obj.set_taborder("3");
            obj.set_text("재고목록");
            this.addChild(obj.name, obj);

            obj = new Button("btn_order", "absolute", "253", "161", "184", "103", null, null, this);
            obj.set_taborder("4");
            obj.set_text("주문하기");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.div_menulist,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");

            	}
            );
            this.div_menulist.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
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
        this.registerScript("MenuList.xfdl", function(exports) {

        this.btn_emp_onclick = function(obj,e)
        {	
        	this.div_menulist.set_url("Base::base_emp.xfdl");
        	
        	this.btn_emp.set_visible(false);
        	this.btn_warehouse.set_visible(false);
        	this.btn_inventory.set_visible(false);
        	this.btn_order.set_visible(false);
        	this.btn_categoryProduct.set_visible(false);
        }

        this.btn_warehouse_onclick = function(obj,e)
        {
        	this.div_menulist.set_url("Base::wharehouse.xfdl");
        	
        	this.btn_emp.set_visible(false);
        	this.btn_warehouse.set_visible(false);
        	this.btn_inventory.set_visible(false);
        	this.btn_order.set_visible(false);
        	this.btn_categoryProduct.set_visible(false);
        }

        this.btn_inventory_onclick = function(obj,e)
        {
        	this.div_menulist.set_url("Base::product.xfdl");
        	
        	this.btn_emp.set_visible(false);
        	this.btn_warehouse.set_visible(false);
        	this.btn_inventory.set_visible(false);
        	this.btn_order.set_visible(false);
        	this.btn_categoryProduct.set_visible(false);
        }

        this.btn_categoryProduct_onclick = function(obj,e)
        {
        	this.div_menulist.set_url("Base::orderlist.xfdl");
        	
        	this.btn_emp.set_visible(false);
        	this.btn_warehouse.set_visible(false);
        	this.btn_inventory.set_visible(false);
        	this.btn_order.set_visible(false);
        	this.btn_categoryProduct.set_visible(false);
        }

        
        this.btn_order_onclick = function(obj,e)
        {
        	this.div_menulist.set_url("Base::ordercustom.xfdl");
        	
        	this.btn_emp.set_visible(false);
        	this.btn_warehouse.set_visible(false);
        	this.btn_inventory.set_visible(false);
        	this.btn_order.set_visible(false);
        	this.btn_categoryProduct.set_visible(false);
        }

        
        this.div_menulist_btn_pivot_onclick = function(obj,e)
        {
            this.div_menulist.set_url("Base::pivot.xfdl");
        	
        	this.btn_emp.set_visible(false);
        	this.btn_warehouse.set_visible(false);
        	this.btn_inventory.set_visible(false);
        	this.btn_order.set_visible(false);
        	this.btn_categoryProduct.set_visible(false);
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.div_menulist.btn_pivot.addEventHandler("onclick", this.div_menulist_btn_pivot_onclick, this);
            this.btn_emp.addEventHandler("onclick", this.btn_emp_onclick, this);
            this.btn_warehouse.addEventHandler("onclick", this.btn_warehouse_onclick, this);
            this.btn_categoryProduct.addEventHandler("onclick", this.btn_categoryProduct_onclick, this);
            this.btn_inventory.addEventHandler("onclick", this.btn_inventory_onclick, this);
            this.btn_order.addEventHandler("onclick", this.btn_order_onclick, this);

        };

        this.loadIncludeScript("MenuList.xfdl", true);

       
    };
}
)();
