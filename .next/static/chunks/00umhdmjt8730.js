(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,34166,e=>{"use strict";var t=e.i(43476),o=e.i(18566),n=e.i(71645),a=e.i(53145),r=e.i(9165),d=e.i(97053);let s=d.default.button.withConfig({displayName:"AddExpenseModal.styles__StyledAddButton",componentId:"sc-1f7f86f8-0"})`
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(45deg, #ff5252, #ff8c00);
    transform: translateY(-2px);
  }
`,i=d.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledModalOverlay",componentId:"sc-1f7f86f8-1"})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`,l=d.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledModalContent",componentId:"sc-1f7f86f8-2"})`
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  padding: 30px;
  border-radius: 20px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;

  &::before {
    content: "🌍";
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 2rem;
    opacity: 0.8;
  }
`,c=d.default.h2.withConfig({displayName:"AddExpenseModal.styles__StyledModalHeader",componentId:"sc-1f7f86f8-3"})`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  color: #4a90e2;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`,p=d.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledErrorContainer",componentId:"sc-1f7f86f8-4"})`
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  color: #721c24;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,x=d.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledFieldContainer",componentId:"sc-1f7f86f8-5"})`
  margin-bottom: ${e=>e.marginBottom||"15px"};
`,f=d.default.label.withConfig({displayName:"AddExpenseModal.styles__StyledLabel",componentId:"sc-1f7f86f8-6"})`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`,g=d.default.input.withConfig({displayName:"AddExpenseModal.styles__StyledInput",componentId:"sc-1f7f86f8-7"})`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid ${e=>e.hasError?"#e74c3c":"#ddd"};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#e74c3c":"#4ecdc4"};
    box-shadow: 0 0 5px rgba(78, 205, 196, 0.5);
  }
`,h=d.default.span.withConfig({displayName:"AddExpenseModal.styles__StyledErrorText",componentId:"sc-1f7f86f8-8"})`
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
`,u=d.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledButtonContainer",componentId:"sc-1f7f86f8-9"})`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
`,b=d.default.button.withConfig({displayName:"AddExpenseModal.styles__StyledCancelButton",componentId:"sc-1f7f86f8-10"})`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${e=>e.isLoading?"not-allowed":"pointer"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${e=>e.isLoading?"#6c757d":"#5a6268"};
    transform: ${e=>e.isLoading?"none":"translateY(-2px)"};
  }
`,m=d.default.button.withConfig({displayName:"AddExpenseModal.styles__StyledSubmitButton",componentId:"sc-1f7f86f8-11"})`
  padding: 12px 24px;
  font-size: 16px;
  background: ${e=>e.isValid&&!e.isLoading?"linear-gradient(45deg, #4ecdc4, #44a08d)":"#ccc"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${e=>e.isValid&&!e.isLoading?"pointer":"not-allowed"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${e=>e.isValid&&!e.isLoading?"linear-gradient(45deg, #26d0ce, #3a8f7a)":"#ccc"};
    transform: ${e=>e.isValid&&!e.isLoading?"translateY(-2px)":"none"};
  }
`,y=({onAddExpense:e})=>{let[o,d]=(0,n.useState)(!1),[y,w]=(0,n.useState)(!1),[j,E]=(0,n.useState)(""),{register:C,handleSubmit:_,reset:S,formState:{errors:k,isValid:v}}=(0,a.useForm)({mode:"onChange"}),N=async t=>{w(!0),E("");try{let o=await fetch((0,r.apiUrl)("/api/expenses"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!o.ok)throw Error(`Error: ${o.status}`);let n=await o.json(),a=n.data||n;e(a),S(),d(!1)}catch(e){E(e instanceof Error?e.message:"Error creating expense")}finally{w(!1)}};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s,{onClick:()=>d(!0),children:"+ Add Expense"}),o&&(0,t.jsx)(i,{children:(0,t.jsxs)(l,{children:[(0,t.jsx)(c,{children:"Add New Expense"}),j&&(0,t.jsx)(p,{children:j}),(0,t.jsxs)("form",{onSubmit:_(N),children:[(0,t.jsxs)(x,{children:[(0,t.jsx)(f,{children:"Description:"}),(0,t.jsx)(g,{type:"text",hasError:!!k.type,...C("type",{required:"Description is required",minLength:{value:2,message:"Description must be at least 2 characters"}}),placeholder:"Enter description"}),k.type&&(0,t.jsx)(h,{children:k.type.message})]}),(0,t.jsxs)(x,{children:[(0,t.jsx)(f,{children:"Amount:"}),(0,t.jsx)(g,{type:"number",step:"0.01",hasError:!!k.amount,...C("amount",{required:"Amount is required",min:{value:.01,message:"Amount must be greater than 0"}}),placeholder:"Enter amount"}),k.amount&&(0,t.jsx)(h,{children:k.amount.message})]}),(0,t.jsxs)(x,{children:[(0,t.jsx)(f,{children:"Date:"}),(0,t.jsx)(g,{type:"date",hasError:!!k.date,...C("date",{required:"Date is required"})}),k.date&&(0,t.jsx)(h,{children:k.date.message})]}),(0,t.jsxs)(x,{marginBottom:"20px",children:[(0,t.jsx)(f,{children:"Category:"}),(0,t.jsx)(g,{type:"text",hasError:!!k.category,...C("category",{required:"Category is required"}),placeholder:"Enter category"}),k.category&&(0,t.jsx)(h,{children:k.category.message})]}),(0,t.jsxs)(u,{children:[(0,t.jsx)(b,{type:"button",onClick:()=>{d(!1),E(""),S()},disabled:y,isLoading:y,children:"Cancel"}),(0,t.jsx)(m,{type:"submit",disabled:!v||y,isValid:v,isLoading:y,children:y?"Creating...":"Add"})]})]})]})})]})},w=d.default.div.withConfig({displayName:"ExpenseList.styles__StyledContainer",componentId:"sc-644284f9-0"})`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`,j=d.default.h1.withConfig({displayName:"ExpenseList.styles__StyledHeader",componentId:"sc-644284f9-1"})`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
`,E=d.default.div.withConfig({displayName:"ExpenseList.styles__StyledButtonContainer",componentId:"sc-644284f9-2"})`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=d.default.button.withConfig({displayName:"ExpenseList.styles__StyledBackButton",componentId:"sc-644284f9-3"})`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
`,_=d.default.button.withConfig({displayName:"ExpenseList.styles__StyledSyncButton",componentId:"sc-644284f9-4"})`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #6b7aff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgb(82, 114, 255);
    transform: translateY(-2px);
  }
`,S=d.default.table.withConfig({displayName:"ExpenseList.styles__StyledExpenseTable",componentId:"sc-644284f9-5"})`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`,k=d.default.th.withConfig({displayName:"ExpenseList.styles__StyledTableHeader",componentId:"sc-644284f9-6"})`
  padding: 15px;
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
`,v=d.default.tr.withConfig({displayName:"ExpenseList.styles__StyledTableRow",componentId:"sc-644284f9-7"})`
  &:nth-child(even) {
    background: rgba(78, 205, 196, 0.1);
  }

  &:hover {
    background: rgba(78, 205, 196, 0.2);
    transform: scale(1.01);
    transition: all 0.2s ease;
  }
`,N=d.default.td.withConfig({displayName:"ExpenseList.styles__StyledTableCell",componentId:"sc-644284f9-8"})`
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #333;
  font-weight: 500;

  &:first-child {
    font-weight: bold;
    color: #4a90e2;
  }

  &:nth-child(2) {
    color: #ff6b6b;
    font-weight: bold;
  }
`,I=d.default.div.withConfig({displayName:"ExpenseList.styles__StyledMessage",componentId:"sc-644284f9-9"})`
  padding: 40px;
  text-align: center;
  color: #333;
  font-size: 1.2rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
`,L=d.default.div.withConfig({displayName:"ExpenseList.styles__StyledPaginationContainer",componentId:"sc-644284f9-10"})`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`,A=d.default.button.withConfig({displayName:"ExpenseList.styles__StyledPaginationButton",componentId:"sc-644284f9-11"})`
  padding: 10px 20px;
  background-color: ${e=>e.disabled?"#ccc":"#4ecdc4"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${e=>e.disabled?"#ccc":"#26d0ce"};
    transform: ${e=>e.disabled?"none":"translateY(-2px)"};
  }
    display: none; // Hidden by default, will be shown when there are expenses to paginate
`,$=d.default.span.withConfig({displayName:"ExpenseList.styles__StyledPaginationInfo",componentId:"sc-644284f9-12"})`
  margin: 0 15px;
  color: #fff;
  font-weight: bold;
`;e.s(["default",0,()=>{let e=(0,o.useRouter)(),{expenses:a,trips:d,loading:s,selectedTrip:i,setSelectedTrip:l,pagination:c,loadExpenses:p,handleAddExpense:x}=(()=>{let[e,t]=(0,n.useState)([]),[o,a]=(0,n.useState)([]),[d,s]=(0,n.useState)(!0),[i,l]=(0,n.useState)(null),[c,p]=(0,n.useState)({totalPages:0,totalExpenses:0,currentPage:1,hasNextPage:!1,hasPrevPage:!1});(0,n.useEffect)(()=>{x(),f(1)},[]),(0,n.useEffect)(()=>{f(1)},[i]);let x=async()=>{try{let e=await fetch((0,r.apiUrl)("/api/trips?page=1"));if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);let t=await e.json();a(t.data.trips||[])}catch(e){console.error("❌ Error loading trips:",e),a([])}},f=async e=>{try{s(!0);let o=(0,r.apiUrl)(`/api/expenses?page=${e}`);i&&(o+=`&travelId=${i.id}`);let n=await fetch(o);if(!n.ok)throw Error(`HTTP error! status: ${n.status}`);let a=await n.json();t(a.data.expenses||[]),a.data.pagination&&p(a.data.pagination)}catch(e){console.error("❌ Error loading expenses:",e),t([])}finally{s(!1)}};return{expenses:e,trips:o,loading:d,selectedTrip:i,setSelectedTrip:l,pagination:c,loadExpenses:f,handleAddExpense:()=>{p(e=>({...e,currentPage:1})),f(1)}}})(),{currentPage:f,hasNextPage:g,hasPrevPage:h}=c,u=i?.dolarExchange??1,b=e=>Math.round(100*e)/100,m=async()=>{try{let e=await fetch((0,r.apiUrl)("/api/admin/sync-sheets"),{method:"POST",headers:{"Content-Type":"application/json"}}),t=await e.json();t.success?alert(t.message):alert("Error: "+t.message)}catch{alert("Cannot connect with server. Please try again later.")}};return(0,t.jsxs)(w,{children:[(0,t.jsx)(j,{children:"Expense List"}),(0,t.jsxs)(E,{children:[(0,t.jsx)(C,{onClick:()=>e.push("/"),children:"← Back to Home"}),(0,t.jsx)(y,{onAddExpense:x}),(0,t.jsx)(_,{onClick:()=>m(),children:"Sync with Google Sheets"})]}),(0,t.jsxs)("div",{style:{marginBottom:"20px",display:"flex",gap:"10px",flexWrap:"wrap"},children:[(0,t.jsx)("button",{onClick:()=>l(null),style:{padding:"8px 16px",backgroundColor:null===i?"#4ecdc4":"#f0f0f0",color:null===i?"white":"#333",border:"none",borderRadius:"20px",cursor:"pointer",fontWeight:"bold"},children:"All"},"all"),d.map(e=>(0,t.jsx)("button",{onClick:()=>l(e),style:{padding:"8px 16px",backgroundColor:i?.id===e.id?"#4ecdc4":"#f0f0f0",color:i?.id===e.id?"white":"#333",border:"none",borderRadius:"20px",cursor:"pointer",fontWeight:"bold"},children:e.destiny},e.id))]}),(0,t.jsxs)(j,{children:["Total Expenses: ",a.length," - Dólar: ",i?.dolarExchange??"-"]}),(0,t.jsx)(S,{children:s?(0,t.jsx)(I,{children:"Loading expenses..."}):0===a.length?(0,t.jsx)(I,{children:"No expenses found."}):(0,t.jsxs)(S,{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)(k,{children:"Date"}),(0,t.jsx)(k,{children:"Description"}),(0,t.jsx)(k,{children:"Amount"}),(0,t.jsx)(k,{children:"Pesos"}),(0,t.jsx)(k,{children:"Dollar"})]})}),(0,t.jsx)("tbody",{children:a.map(e=>{let o,n;return(0,t.jsxs)(v,{children:[(0,t.jsx)(N,{children:e.date?new Date(e.date).toLocaleDateString():"-"}),(0,t.jsx)(N,{children:e.type}),(0,t.jsxs)(N,{children:[{Pesos:"$",Dólar:"U$D",Real:"R$"}[e.exchange]??"-"," ",e.amount]}),(0,t.jsx)(N,{children:"$ "+(o=e.amount,b("Dólar"===e.exchange?o*u:o))}),(0,t.jsx)(N,{children:"U$D "+(n=e.amount,b("Pesos"===e.exchange?n/u:n))})]},e.id)})})]})}),(0,t.jsxs)(L,{children:[(0,t.jsx)(A,{disabled:!h,onClick:()=>p(f-1),children:"← Previous"}),(0,t.jsxs)($,{children:["Showing ",a.length," expenses"]}),(0,t.jsx)(A,{disabled:!g,onClick:()=>p(f+1),children:"Next →"})]})]})}],34166)}]);