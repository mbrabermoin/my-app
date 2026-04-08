(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10925,e=>{"use strict";var t=e.i(43476),a=e.i(71645),d=e.i(18566),o=e.i(53145),i=e.i(9165),s=e.i(97053);let r=s.default.button.withConfig({displayName:"AddUserModal.styles__StyledAddButton",componentId:"sc-8187f4ed-0"})`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`,n=s.default.div.withConfig({displayName:"AddUserModal.styles__StyledModalOverlay",componentId:"sc-8187f4ed-1"})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,l=s.default.div.withConfig({displayName:"AddUserModal.styles__StyledModalContent",componentId:"sc-8187f4ed-2"})`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`,c=s.default.h2.withConfig({displayName:"AddUserModal.styles__StyledModalHeader",componentId:"sc-8187f4ed-3"})`
  margin-top: 0;
  margin-bottom: 20px;
`,p=s.default.div.withConfig({displayName:"AddUserModal.styles__StyledErrorContainer",componentId:"sc-8187f4ed-4"})`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
`,g=s.default.div.withConfig({displayName:"AddUserModal.styles__StyledFieldContainer",componentId:"sc-8187f4ed-5"})`
  margin-bottom: ${e=>e.marginBottom||"15px"};
`,x=s.default.label.withConfig({displayName:"AddUserModal.styles__StyledLabel",componentId:"sc-8187f4ed-6"})`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`,h=s.default.input.withConfig({displayName:"AddUserModal.styles__StyledInput",componentId:"sc-8187f4ed-7"})`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${e=>e.hasError?"#e74c3c":"#ccc"};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${e=>e.hasError?"#e74c3c":"#007bff"};
  }
`,f=s.default.span.withConfig({displayName:"AddUserModal.styles__StyledErrorText",componentId:"sc-8187f4ed-8"})`
  color: #e74c3c;
  font-size: 14px;
`,m=s.default.div.withConfig({displayName:"AddUserModal.styles__StyledButtonContainer",componentId:"sc-8187f4ed-9"})`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`,u=s.default.button.withConfig({displayName:"AddUserModal.styles__StyledCancelButton",componentId:"sc-8187f4ed-10"})`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${e=>e.isLoading?"not-allowed":"pointer"};

  &:hover {
    background-color: ${e=>e.isLoading?"#6c757d":"#5a6268"};
  }
`,b=s.default.button.withConfig({displayName:"AddUserModal.styles__StyledSubmitButton",componentId:"sc-8187f4ed-11"})`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${e=>e.isValid&&!e.isLoading?"#4CAF50":"#ccc"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${e=>e.isValid&&!e.isLoading?"pointer":"not-allowed"};

  &:hover {
    background-color: ${e=>e.isValid&&!e.isLoading?"#45a049":e.isValid&&!e.isLoading?"#4CAF50":"#ccc"};
  }
`,y=({onAddUser:e})=>{let[d,s]=(0,a.useState)(!1),[y,w]=(0,a.useState)(!1),[_,j]=(0,a.useState)(""),{register:C,handleSubmit:S,reset:U,formState:{errors:N,isValid:I}}=(0,o.useForm)({mode:"onChange"}),k=async t=>{w(!0),j("");try{let a=await fetch((0,i.apiUrl)("/api/users"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok)throw Error(`Error: ${a.status}`);let d=await a.json(),o=d.data||d;e(o),U(),s(!1)}catch(e){j(e instanceof Error?e.message:"Error creating user")}finally{w(!1)}};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r,{onClick:()=>s(!0),children:"+ Add User"}),d&&(0,t.jsx)(n,{children:(0,t.jsxs)(l,{children:[(0,t.jsx)(c,{children:"Add New User"}),_&&(0,t.jsx)(p,{children:_}),(0,t.jsxs)("form",{onSubmit:S(k),children:[(0,t.jsxs)(g,{children:[(0,t.jsx)(x,{children:"Name:"}),(0,t.jsx)(h,{type:"text",hasError:!!N.name,...C("name",{required:"Name is required",minLength:{value:2,message:"Name must be at least 2 characters"}}),placeholder:"Enter name"}),N.name&&(0,t.jsx)(f,{children:N.name.message})]}),(0,t.jsxs)(g,{marginBottom:"20px",children:[(0,t.jsx)(x,{children:"Email:"}),(0,t.jsx)(h,{type:"email",hasError:!!N.email,...C("email",{required:"Email is required",pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email"}}),placeholder:"Enter email"}),N.email&&(0,t.jsx)(f,{children:N.email.message})]}),(0,t.jsxs)(m,{children:[(0,t.jsx)(u,{type:"button",onClick:()=>{s(!1),j(""),U()},disabled:y,isLoading:y,children:"Cancelar"}),(0,t.jsx)(b,{type:"submit",disabled:!I||y,isValid:I,isLoading:y,children:y?"Creando...":"Agregar"})]})]})]})})]})},w=s.default.div.withConfig({displayName:"UserList.styles__StyledContainer",componentId:"sc-796119a2-0"})`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`,_=s.default.h1.withConfig({displayName:"UserList.styles__StyledHeader",componentId:"sc-796119a2-1"})`
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`,j=s.default.div.withConfig({displayName:"UserList.styles__StyledButtonContainer",componentId:"sc-796119a2-2"})`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=s.default.button.withConfig({displayName:"UserList.styles__StyledBackButton",componentId:"sc-796119a2-3"})`
  padding: 10px 20px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`,S=s.default.table.withConfig({displayName:"UserList.styles__StyledUserTable",componentId:"sc-796119a2-4"})`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`,U=s.default.th.withConfig({displayName:"UserList.styles__StyledTableHeader",componentId:"sc-796119a2-5"})`
  padding: 15px;
  text-align: left;
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`,N=s.default.tr.withConfig({displayName:"UserList.styles__StyledTableRow",componentId:"sc-796119a2-6"})`
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.01);
  }
`,I=s.default.td.withConfig({displayName:"UserList.styles__StyledTableCell",componentId:"sc-796119a2-7"})`
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`,k=s.default.div.withConfig({displayName:"UserList.styles__StyledMessage",componentId:"sc-796119a2-8"})`
  padding: 40px;
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`,v=s.default.div.withConfig({displayName:"UserList.styles__StyledPaginationContainer",componentId:"sc-796119a2-9"})`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`,A=s.default.button.withConfig({displayName:"UserList.styles__StyledPaginationButton",componentId:"sc-796119a2-10"})`
  padding: 10px 20px;
  background: ${e=>e.disabled?"rgba(255, 255, 255, 0.3)":"linear-gradient(45deg, #4facfe, #00f2fe)"};
  color: white;
  border: none;
  border-radius: 25px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: ${e=>e.disabled?"none":"translateY(-2px)"};
    box-shadow: ${e=>e.disabled?"none":"0 6px 20px rgba(0, 0, 0, 0.3)"};
  }
`,L=s.default.span.withConfig({displayName:"UserList.styles__StyledPaginationInfo",componentId:"sc-796119a2-11"})`
  margin: 0 15px;
  font-weight: bold;
  color: #fff;
`;e.s(["default",0,()=>{let e=(0,d.useRouter)(),[o,s]=(0,a.useState)([]),[r,n]=(0,a.useState)(!0),[l,c]=(0,a.useState)({totalPages:0,totalUsers:0,currentPage:1,hasNextPage:!1,hasPrevPage:!1});(0,a.useEffect)(()=>{p(1)},[]);let p=async e=>{try{n(!0);let t=await fetch((0,i.apiUrl)(`/api/users?page=${e}&limit=5`));if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);let a=await t.json();s(a.data.users||[]),a.data.pagination&&c(a.data.pagination)}catch(e){console.error("❌ Error loading users:",e),s([])}finally{n(!1)}},{currentPage:g,totalPages:x,totalUsers:h,hasNextPage:f,hasPrevPage:m}=l;return(0,t.jsxs)(w,{children:[(0,t.jsx)(_,{children:"User List"}),(0,t.jsxs)(j,{children:[(0,t.jsx)(C,{onClick:()=>e.push("/"),children:"← Back to Home"}),(0,t.jsx)(y,{onAddUser:()=>{c(e=>({...e,currentPage:1})),p(1)}})]}),r?(0,t.jsx)(k,{children:"Loading users..."}):0===o.length?(0,t.jsx)(k,{children:"No users found."}):(0,t.jsxs)(S,{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)(U,{children:"ID"}),(0,t.jsx)(U,{children:"Name"}),(0,t.jsx)(U,{children:"Email"})]})}),(0,t.jsx)("tbody",{children:o.map(e=>(0,t.jsxs)(N,{children:[(0,t.jsx)(I,{children:e.id}),(0,t.jsx)(I,{children:e.name}),(0,t.jsx)(I,{children:e.email})]},e.id))})]}),(0,t.jsxs)(v,{children:[(0,t.jsx)(A,{disabled:!m,onClick:()=>p(g-1),children:"← Previous"}),(0,t.jsxs)(L,{children:["Page ",g," of ",x," | Showing ",o.length,"/",h," users"]}),(0,t.jsx)(A,{disabled:!f,onClick:()=>p(g+1),children:"Next →"})]})]})}],10925)}]);