export const parseDatabaseData = (data:any, name:string) =>{
    const datareturned = data.rows[0][name];
    return datareturned??[];
    // console.log(users.rows[0]["getalluserstosendemail"]);
}