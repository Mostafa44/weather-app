
const weatherForm = document.querySelector('form');
const search= document.querySelector('input');
const message1= document.querySelector('#message1');
const message2= document.querySelector('#message2');

weatherForm.addEventListener('submit', (e)=>{
    //in order to prevent the default behavior of refreshing the page
    e.preventDefault();
    message1.textContent='Loading ....';
    message2.textContent='';
    console.log('testing!!!!');
    console.log(search.value);
    if (!search.value){
        console.log('You should have entered a value');
    }else{
        fetch(`http://localhost:3000/weather?address=${search.value}`).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if (data.error){
            message1.textContent=data.error;
        }else{
            message1.textContent=data.location;
            message2.textContent=data.forecast;
        }
    });
});
    }
})