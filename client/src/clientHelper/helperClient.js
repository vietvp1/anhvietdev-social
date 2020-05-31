import { toast } from 'react-toastify';


export const checkCoverImage = (file) => {
    return new Promise(async (resolve, reject) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(file);

        const types = ['image/png', 'image/jpeg'];
        // compare file type find doesn't matach
        if (types.every(type => file.type !== type)) {
            // create error message and assign to container   
            let err = file.type + ' không được hỗ trợ\n';
            toast.error(err)
            return reject(false);
        }

        if (file.size > 2 * 1048576) {
            let err = file.type + 'tệp quá lớn, chỉ cho phép tệp tối đa 2MB\n';
            toast.error(err)
            return reject(false);
        }

        img.onload = () => {
            let rate = img.width * 1.0 / img.height;
            if (rate < 4) {
                toast.error("Kích thước không phù hợp, tỷ lệ của chiều rộng với chiều dài phải từ 4 trở lên.")
                return reject(false);
            } else resolve(true);
        }
    });
}

export const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Read the image via FileReader API and save image result in state.
        reader.onload = function (e) {
            // Add the file name to the data URL
            let dataURL = e.target.result;
            dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
            resolve({ file, dataURL });
        };

        reader.readAsDataURL(file);
    });
}

export const maxSelectFile = (event) => {
    let files = event.target.files // create file object
    if (files.length > 5) {
        const msg = 'Chỉ có thể tải tối đa 3 ảnh 1 lúc'
        event.target.value = null // discard selected file
        toast.error(msg);
        return false;

    }
    return true;
}

export const checkMimeType = (event) => {
    //getting file object
    let files = event.target.files
    //define message container
    let err = ''
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif', 'video/mp4']
    // loop access array
    for (let x = 0; x < files.length; x++) {
        // compare file type find doesn't matach
        if (types.every(type => files[x].type !== type)) {
            // create error message and assign to container   
            err += files[x].type + ' không được hỗ trợ\n';
        }
    };

    if (err !== '') { // if message not same old that mean has error 
        event.target.value = null // discard selected file
        toast.error(err)
        return false;
    }
    return true;

}

export const checkFileSize = (event) => {
    console.log(event.target);
    
    let files = event.target.files
    let size = 2 * 1048576 //2MB
    let err = "";
    for (var x = 0; x < files.length; x++) {
        if (files[x].size > size) {
            err += files[x].type + 'tệp quá lớn, chỉ cho phép tệp tối đa 2MB\n';
        }
    };
    if (err !== '') {
        event.target.value = null
        toast.error(err)
        return false
    }

    return true;

}

export const checkFilesQuantity = (event, file) => {
    let files = event.target.files
    let count = 0;
    for (var x = 0; x < file.length; x++) {
        count++;
    }
    if ((count + files.length) > 3) {
        const msg = 'Không thể upload quá 3 file'
        event.target.value = null // discard selected file
        toast.error(msg)
        return false;
    }
    return true;
}

export const lastItemOfArray = (array) => {
    if (!array.length) {
        return [];
    }
    return array[array.length - 1];
};

export let bufferToBase64 = (bufferFrom) => {
    return Buffer.from(bufferFrom).toString("base64");
};


export const moveToTheTop = (array, elementId) => {
    for (let e of array) {
        if (e._id === elementId) {
            let pos = array.indexOf(e);
            array.unshift(e);
            array.splice(pos + 1, 1)
            break;
        }
    }
    return array
}