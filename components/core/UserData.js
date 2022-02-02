import UserForm from "../../components/core/UserForm"

const UserData = ({ userDataOpen, handleUserData }) => {
    return (
        <div className={!userDataOpen ? "user__data" : "user__data open"}>
            <div className="user__data-top">
                <div onClick={handleUserData} className="close-data">
                    <span>&lt;</span>
                    <span>Закрыть</span>
                </div>

                <div className="user__data-title">
                    Личные данные
                </div>
            </div>
            <div className="user__profile">
                <div className="title">
                    Если ты заполнишь это поле, то получишь возможности общаться с людьми, получать бонусы
                </div>
                <UserForm />
            </div >
        </div>
    )
}

export default UserData