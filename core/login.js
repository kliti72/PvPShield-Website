import { sendGet } from '../util/util.js'

const playerLoginButton = document.getElementById("playerLoginButton");
isNotAuth()

let profile = {
    uuid: "",
    username: "",
    avatar: ""
};

playerLoginButton.addEventListener('click', async (e) => {
    {
        let userName = document.getElementById("playerName").value;

        try {
            let profilePlayer = await sendGet(userName);
            saveUser(profilePlayer);
            updateStatus("success");
            hiddenLoginSection();
            isAuth();
            createProfilePage();
        } catch (e) {
            updateStatus("error")
        }

        // https://playerdb.co/api/player/hytale/kliTi2000
        // alert(profilePlayer.data.player.id);
        // alert(profilePlayer.data.player.username);
        // alert(profilePlayer.data.player.avatar);
    }
})


function createProfilePage() {
    const elementAvatar = document.getElementById("avatar");
    const elementUuid = document.getElementById("uuid");
    const elementUsername = document.getElementById("username");

    const header_item_img = document.getElementById("header_item_img")

    elementUuid.textContent = profile.uuid;
    elementUsername.textContent = profile.username;
    console.log(profile.username);
    elementAvatar.src = profile.avatar;
    header_item_img.src = profile.avatar;


}

// Status Erro Manage
const STATUS = {
    error: {
        message: "Utente Non trovato, assicurati di essere online sul server play.pvpshield.com, se non riesci ad accedere entra su discord, ti aiuteremo",
        color: "red"
    },
    success: {
        message: "Login Effettuato.",
        color: "green"
    },
}

function updateStatus(status) {
    const elementStatus = document.getElementById("statusLogin");

    if (status === "success") {
        elementStatus.textContent = STATUS.success.message;
        elementStatus.style.color = STATUS.success.color;
    } else {
        elementStatus.textContent = STATUS.error.message;
        elementStatus.style.color = STATUS.error.color;
    }

}


function isNotAuth() {
    const authenticated = document.getElementById("Auth");
    authenticated.style.display = "none";
}

function isAuth() {
    const authenticated = document.getElementById("Auth");
    authenticated.style.display = "block";
}

function hiddenLoginSection() {
    const loginSection = document.getElementById("LoginSection");
    loginSection.style.display = "none";
}

function saveUser(profilePlayer) {
    profile.uuid = profilePlayer.data.player.id;
    profile.username = profilePlayer.data.player.username;
    profile.avatar = profilePlayer.data.player.avatar;
}

function clearSpace(string) {
    str = string.replace(/\s+/g, '');
    return str;
}