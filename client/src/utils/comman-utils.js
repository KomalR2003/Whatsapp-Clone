

export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
export const downloadMedia = (e, originalIamge) => {
    e.preventDefault();

    try{
        fetch(originalIamge)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            const nameSplit = originalIamge.split("/");
            const duplicateName = nameSplit.pop();

            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(error => console.log("Error while downloading the image", error.message));
    }catch(error){
        console.log("Error while downloading the image", error.message);
    }
}

// Helper function to get profile picture with fallback
export const getProfilePicture = (pictureUrl) => {
    if (!pictureUrl) {
        return 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';
    }
    
    // Check if the URL is valid
    try {
        new URL(pictureUrl);
        return pictureUrl;
    } catch {
        return 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';
    }
}