module.exports=[14421,a=>{"use strict";var b=a.i(87924),c=a.i(50944),d=a.i(72131),e=a.i(95245),f=a.i(19032),g=a.i(75716);let h=g.default.button.withConfig({displayName:"AddExpenseModal.styles__StyledAddButton",componentId:"sc-1f7f86f8-0"})`
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
`,i=g.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledModalOverlay",componentId:"sc-1f7f86f8-1"})`
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
`,j=g.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledModalContent",componentId:"sc-1f7f86f8-2"})`
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
`,k=g.default.h2.withConfig({displayName:"AddExpenseModal.styles__StyledModalHeader",componentId:"sc-1f7f86f8-3"})`
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  color: #4a90e2;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`,l=g.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledErrorContainer",componentId:"sc-1f7f86f8-4"})`
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  color: #721c24;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,m=g.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledFieldContainer",componentId:"sc-1f7f86f8-5"})`
  margin-bottom: ${a=>a.marginBottom||"15px"};
`,n=g.default.label.withConfig({displayName:"AddExpenseModal.styles__StyledLabel",componentId:"sc-1f7f86f8-6"})`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`,o=g.default.input.withConfig({displayName:"AddExpenseModal.styles__StyledInput",componentId:"sc-1f7f86f8-7"})`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid ${a=>a.hasError?"#e74c3c":"#ddd"};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${a=>a.hasError?"#e74c3c":"#4ecdc4"};
    box-shadow: 0 0 5px rgba(78, 205, 196, 0.5);
  }
`,p=g.default.span.withConfig({displayName:"AddExpenseModal.styles__StyledErrorText",componentId:"sc-1f7f86f8-8"})`
  color: #e74c3c;
  font-size: 14px;
  font-weight: 500;
`,q=g.default.div.withConfig({displayName:"AddExpenseModal.styles__StyledButtonContainer",componentId:"sc-1f7f86f8-9"})`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
`,r=g.default.button.withConfig({displayName:"AddExpenseModal.styles__StyledCancelButton",componentId:"sc-1f7f86f8-10"})`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${a=>a.isLoading?"not-allowed":"pointer"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${a=>a.isLoading?"#6c757d":"#5a6268"};
    transform: ${a=>a.isLoading?"none":"translateY(-2px)"};
  }
`,s=g.default.button.withConfig({displayName:"AddExpenseModal.styles__StyledSubmitButton",componentId:"sc-1f7f86f8-11"})`
  padding: 12px 24px;
  font-size: 16px;
  background: ${a=>a.isValid&&!a.isLoading?"linear-gradient(45deg, #4ecdc4, #44a08d)":"#ccc"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${a=>a.isValid&&!a.isLoading?"pointer":"not-allowed"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${a=>a.isValid&&!a.isLoading?"linear-gradient(45deg, #26d0ce, #3a8f7a)":"#ccc"};
    transform: ${a=>a.isValid&&!a.isLoading?"translateY(-2px)":"none"};
  }
`,t=({onAddExpense:a})=>{let[c,g]=(0,d.useState)(!1),[t,u]=(0,d.useState)(!1),[v,w]=(0,d.useState)(""),{register:x,handleSubmit:y,reset:z,formState:{errors:A,isValid:B}}=(0,e.useForm)({mode:"onChange"}),C=async b=>{u(!0),w("");try{let c=await fetch((0,f.apiUrl)("/api/expenses"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});if(!c.ok)throw Error(`Error: ${c.status}`);let d=await c.json(),e=d.data||d;a(e),z(),g(!1)}catch(a){w(a instanceof Error?a.message:"Error creating expense")}finally{u(!1)}};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(h,{onClick:()=>g(!0),children:"+ Add Expense"}),c&&(0,b.jsx)(i,{children:(0,b.jsxs)(j,{children:[(0,b.jsx)(k,{children:"Add New Expense"}),v&&(0,b.jsx)(l,{children:v}),(0,b.jsxs)("form",{onSubmit:y(C),children:[(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:"Description:"}),(0,b.jsx)(o,{type:"text",hasError:!!A.type,...x("type",{required:"Description is required",minLength:{value:2,message:"Description must be at least 2 characters"}}),placeholder:"Enter description"}),A.type&&(0,b.jsx)(p,{children:A.type.message})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:"Amount:"}),(0,b.jsx)(o,{type:"number",step:"0.01",hasError:!!A.amount,...x("amount",{required:"Amount is required",min:{value:.01,message:"Amount must be greater than 0"}}),placeholder:"Enter amount"}),A.amount&&(0,b.jsx)(p,{children:A.amount.message})]}),(0,b.jsxs)(m,{children:[(0,b.jsx)(n,{children:"Date:"}),(0,b.jsx)(o,{type:"date",hasError:!!A.date,...x("date",{required:"Date is required"})}),A.date&&(0,b.jsx)(p,{children:A.date.message})]}),(0,b.jsxs)(m,{marginBottom:"20px",children:[(0,b.jsx)(n,{children:"Category:"}),(0,b.jsx)(o,{type:"text",hasError:!!A.category,...x("category",{required:"Category is required"}),placeholder:"Enter category"}),A.category&&(0,b.jsx)(p,{children:A.category.message})]}),(0,b.jsxs)(q,{children:[(0,b.jsx)(r,{type:"button",onClick:()=>{g(!1),w(""),z()},disabled:t,isLoading:t,children:"Cancel"}),(0,b.jsx)(s,{type:"submit",disabled:!B||t,isValid:B,isLoading:t,children:t?"Creating...":"Add"})]})]})]})})]})},u=g.default.div.withConfig({displayName:"ExpenseList.styles__StyledContainer",componentId:"sc-644284f9-0"})`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`,v=g.default.h1.withConfig({displayName:"ExpenseList.styles__StyledHeader",componentId:"sc-644284f9-1"})`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
`,w=g.default.div.withConfig({displayName:"ExpenseList.styles__StyledButtonContainer",componentId:"sc-644284f9-2"})`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,x=g.default.button.withConfig({displayName:"ExpenseList.styles__StyledBackButton",componentId:"sc-644284f9-3"})`
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
`,y=g.default.button.withConfig({displayName:"ExpenseList.styles__StyledSyncButton",componentId:"sc-644284f9-4"})`
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
`,z=g.default.table.withConfig({displayName:"ExpenseList.styles__StyledExpenseTable",componentId:"sc-644284f9-5"})`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`,A=g.default.th.withConfig({displayName:"ExpenseList.styles__StyledTableHeader",componentId:"sc-644284f9-6"})`
  padding: 15px;
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
`,B=g.default.tr.withConfig({displayName:"ExpenseList.styles__StyledTableRow",componentId:"sc-644284f9-7"})`
  &:nth-child(even) {
    background: rgba(78, 205, 196, 0.1);
  }

  &:hover {
    background: rgba(78, 205, 196, 0.2);
    transform: scale(1.01);
    transition: all 0.2s ease;
  }
`,C=g.default.td.withConfig({displayName:"ExpenseList.styles__StyledTableCell",componentId:"sc-644284f9-8"})`
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
`,D=g.default.div.withConfig({displayName:"ExpenseList.styles__StyledMessage",componentId:"sc-644284f9-9"})`
  padding: 40px;
  text-align: center;
  color: #333;
  font-size: 1.2rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
`,E=g.default.div.withConfig({displayName:"ExpenseList.styles__StyledPaginationContainer",componentId:"sc-644284f9-10"})`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`,F=g.default.button.withConfig({displayName:"ExpenseList.styles__StyledPaginationButton",componentId:"sc-644284f9-11"})`
  padding: 10px 20px;
  background-color: ${a=>a.disabled?"#ccc":"#4ecdc4"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${a=>a.disabled?"not-allowed":"pointer"};
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${a=>a.disabled?"#ccc":"#26d0ce"};
    transform: ${a=>a.disabled?"none":"translateY(-2px)"};
  }
    display: none; // Hidden by default, will be shown when there are expenses to paginate
`,G=g.default.span.withConfig({displayName:"ExpenseList.styles__StyledPaginationInfo",componentId:"sc-644284f9-12"})`
  margin: 0 15px;
  color: #fff;
  font-weight: bold;
`;a.s(["default",0,()=>{let a=(0,c.useRouter)(),{expenses:e,trips:g,loading:h,selectedTrip:i,setSelectedTrip:j,pagination:k,loadExpenses:l,handleAddExpense:m}=(()=>{let[a,b]=(0,d.useState)([]),[c,e]=(0,d.useState)([]),[g,h]=(0,d.useState)(!0),[i,j]=(0,d.useState)(null),[k,l]=(0,d.useState)({totalPages:0,totalExpenses:0,currentPage:1,hasNextPage:!1,hasPrevPage:!1});(0,d.useEffect)(()=>{m(),n(1)},[]),(0,d.useEffect)(()=>{n(1)},[i]);let m=async()=>{try{let a=await fetch((0,f.apiUrl)("/api/trips?page=1"));if(!a.ok)throw Error(`HTTP error! status: ${a.status}`);let b=await a.json();e(b.data.trips||[])}catch(a){console.error("❌ Error loading trips:",a),e([])}},n=async a=>{try{h(!0);let c=(0,f.apiUrl)(`/api/expenses?page=${a}`);i&&(c+=`&travelId=${i.id}`);let d=await fetch(c);if(!d.ok)throw Error(`HTTP error! status: ${d.status}`);let e=await d.json();b(e.data.expenses||[]),e.data.pagination&&l(e.data.pagination)}catch(a){console.error("❌ Error loading expenses:",a),b([])}finally{h(!1)}};return{expenses:a,trips:c,loading:g,selectedTrip:i,setSelectedTrip:j,pagination:k,loadExpenses:n,handleAddExpense:()=>{l(a=>({...a,currentPage:1})),n(1)}}})(),{currentPage:n,hasNextPage:o,hasPrevPage:p}=k,q=i?.dolarExchange??1,r=a=>Math.round(100*a)/100,s=async()=>{try{let a=await fetch((0,f.apiUrl)("/api/admin/sync-sheets"),{method:"POST",headers:{"Content-Type":"application/json"}}),b=await a.json();b.success?alert(b.message):alert("Error: "+b.message)}catch{alert("Cannot connect with server. Please try again later.")}};return(0,b.jsxs)(u,{children:[(0,b.jsx)(v,{children:"Expense List"}),(0,b.jsxs)(w,{children:[(0,b.jsx)(x,{onClick:()=>a.push("/"),children:"← Back to Home"}),(0,b.jsx)(t,{onAddExpense:m}),(0,b.jsx)(y,{onClick:()=>s(),children:"Sync with Google Sheets"})]}),(0,b.jsxs)("div",{style:{marginBottom:"20px",display:"flex",gap:"10px",flexWrap:"wrap"},children:[(0,b.jsx)("button",{onClick:()=>j(null),style:{padding:"8px 16px",backgroundColor:null===i?"#4ecdc4":"#f0f0f0",color:null===i?"white":"#333",border:"none",borderRadius:"20px",cursor:"pointer",fontWeight:"bold"},children:"All"},"all"),g.map(a=>(0,b.jsx)("button",{onClick:()=>j(a),style:{padding:"8px 16px",backgroundColor:i?.id===a.id?"#4ecdc4":"#f0f0f0",color:i?.id===a.id?"white":"#333",border:"none",borderRadius:"20px",cursor:"pointer",fontWeight:"bold"},children:a.destiny},a.id))]}),(0,b.jsxs)(v,{children:["Total Expenses: ",e.length," - Dólar: ",i?.dolarExchange??"-"]}),(0,b.jsx)(z,{children:h?(0,b.jsx)(D,{children:"Loading expenses..."}):0===e.length?(0,b.jsx)(D,{children:"No expenses found."}):(0,b.jsxs)(z,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(A,{children:"Date"}),(0,b.jsx)(A,{children:"Description"}),(0,b.jsx)(A,{children:"Amount"}),(0,b.jsx)(A,{children:"Pesos"}),(0,b.jsx)(A,{children:"Dollar"})]})}),(0,b.jsx)("tbody",{children:e.map(a=>{let c,d;return(0,b.jsxs)(B,{children:[(0,b.jsx)(C,{children:a.date?new Date(a.date).toLocaleDateString():"-"}),(0,b.jsx)(C,{children:a.type}),(0,b.jsxs)(C,{children:[{Pesos:"$",Dólar:"U$D",Real:"R$"}[a.exchange]??"-"," ",a.amount]}),(0,b.jsx)(C,{children:"$ "+(c=a.amount,r("Dólar"===a.exchange?c*q:c))}),(0,b.jsx)(C,{children:"U$D "+(d=a.amount,r("Pesos"===a.exchange?d/q:d))})]},a.id)})})]})}),(0,b.jsxs)(E,{children:[(0,b.jsx)(F,{disabled:!p,onClick:()=>l(n-1),children:"← Previous"}),(0,b.jsxs)(G,{children:["Showing ",e.length," expenses"]}),(0,b.jsx)(F,{disabled:!o,onClick:()=>l(n+1),children:"Next →"})]})]})}],14421)}];

//# sourceMappingURL=src_features_TravelTracker_ExpenseList_tsx_0_egyyb._.js.map