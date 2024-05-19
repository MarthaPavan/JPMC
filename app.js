function fetchData()
{
    var url = "http://localhost:3000/api/students"
    axios.get(url).then(res => {
        console.log(res.data);
        var str = `<html><body><table><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Action</th></tr>`;
        res.data.forEach( student =>{
            str += `<tr><td>${student._id}</td><td>${student.name}</td><td>${student.email}</td><td>${student.phone}</td><td><button onclick="updateData()">Edit</button><button onclick="removeData(${student._id})">Remove</button></td></td></tr>`
        });
        str += `</body></html>`;
        document.getElementById("result").innerHTML = str;
    });
};
function postData()
{
    var url = "http://localhost:3000/api/students"
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    const obj = {
        _id:id,
        name:name,
        email:email,
        phone:phone
    };
    axios.post(url, obj).then( res => {
        fetchData();
    });
};
deleteData = () =>
{
    var url = "http://localhost:3000/api/students/"
    var id = document.getElementById("id").value;
    url += id;
    axios.delete(url).then(res =>{
            fetchData();
        }
    );
};
updateData = () =>
{
    var url = "http://localhost:3000/api/students/"
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    url += id;
    const obj = {
        "name":name,
        "email":email,
        "phone":phone
    };
    axios.patch(url,obj).then( res =>{
        fetchData();
    });
};
function removeData(id)
{
    var url = "http://localhost:3000/api/students/"
    url += id;
    axios.delete(url).then(res =>{
            fetchData();
        }
    );
};