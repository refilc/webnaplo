// import { LoginUser } from "../../models/user";
// import { loginAPI } from "../../utils/api/login";

const AppHome = () => {
    // const loginSuccess = async (user: LoginUser) => {
    //     console.log(user.id, user.username, user.instituteCode, user.name);
    // }

    const loginTest = async () => {
    //     const response =  await loginAPI('72687219753', '2007-09-05', 'bgeszc-ganz', loginSuccess);
    //     console.log(response);
    }

    return (
        <div className="mt-10">
            app home
            <button onClick={loginTest}>logintest</button>
        </div>
    )
}

export default AppHome;