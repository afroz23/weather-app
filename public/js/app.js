const formselected=document.querySelector('form');
const inputselected=document.querySelector('input');
const item1=document.querySelector('#item-1');
const item2=document.querySelector('#item-2');
formselected.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=inputselected.value;
    item1.textContent='Loading...';
    item2.textContent='';
fetch(`/weather?address=${location}`).then((response)=>
{  response.json().then((data)=>{
    if(data.error)
      item1.textContent=data.error;
    else
    {
       item1.textContent=data.location;
       item2.textContent=data.forecast;
    }
})
});
})