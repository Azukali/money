import { addItem } from "./contants";

// const initState = {
//     textData: 1
// }

const needData = {
  list:[],
  searchName: ""
};

const reducer = (state = needData, action) => {
  if(action.type === "getItem"){
    let newValue = JSON.parse(JSON.stringify(state));
    newValue.list = action.value            //   以接口返还的数据赋值
    return newValue
  }
  if(action.type === "searchName"){
    let newValue = JSON.parse(JSON.stringify(state));
    if(action.value === ""){
      newValue.list = state.list
    }else{
      let lastList = []
      const needList = newValue.list;
      const searchValue = action.value;
      needList.forEach((items)=>{
        if(items.name === searchValue){
          lastList.push(items)
        }
      })
      newValue.list = lastList
    }
    

    return newValue
  }
 
  return state;
};

export default reducer;
