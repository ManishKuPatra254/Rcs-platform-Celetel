import axios from 'axios';

export const registerUser = async (formData) => {
    try {
        const responseContact = await axios.post('https://main-rcs.vercel.app/auth/register', formData, {
            headers: {
                'Content-Type': 'application/json',

            }
        });
        console.log(responseContact.data, "responseContact");
        return responseContact.data;
    } catch (error) {
        console.log("Contact error", error.message);
        throw error;
    }
};



export const loginUser = async (formData) => {
    console.log(formData);
    try {
        const response = await axios.post('https://main-rcs.vercel.app/auth/login', formData);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        console.log("Login error", error.message);
        throw error;
    }
}


export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const responseContact = await axios.get('https://main-rcs.vercel.app/profile/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(responseContact.data, "responseContact");
        return responseContact.data;
    } catch (error) {
        console.log("Profile fetch error", error.message);
        throw error;
    }
}

export const updateProfile = async (profile) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('https://main-rcs.vercel.app/profile/update', profile, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
}


export const changePassword = async (password) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('https://main-rcs.vercel.app/profile/change-password', password, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
}



export const getCampaignsDetails = async () => {
    try {
        const token = localStorage.getItem('token');
        const responseContact = await axios.get('https://projectors.vercel.app/api/campaigns/templates-bots', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(responseContact.data, "responseContact");
        return responseContact.data;
    } catch (error) {
        console.log("Profile fetch error", error.message);
        throw error;
    }
}


export const createCampaigns = async (campaigns) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://projectors.vercel.app/api/campaigns', campaigns, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
}


export const getTemplateDetailsList = async () => {
    const token = localStorage.getItem('token');

    try {
        const responseContact = await axios.get('https://main-rcs.vercel.app/api/template/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(responseContact.data, "responseContact");
        return responseContact.data;
    } catch (error) {
        console.log("Profile fetch error", error.message);
        throw error;
    }
}


export const createNewTemplates = async (createTemplates) => {
    console.log(createTemplates, "createtemplates")
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://main-rcs.vercel.app/api/template/create', createTemplates, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
}
export const createBots = async (createBot) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://main-rcs.vercel.app/api/bot', createBot, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
}

export const updateBot = async (currentBotId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put('https://main-rcs.vercel.app/api/botId', currentBotId, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
}


export const getTemplatedataById = async (id) => {
    console.log(id, "templateid");
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`https://main-rcs.vercel.app/api/template/details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
};


export const updateTemplatedataById = async (id, updatedData) => {
    console.log(id, "updatetemplateid");
    const token = localStorage.getItem('token');

    try {
        const response = await axios.put(`https://main-rcs.vercel.app/api/template/update/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        console.log("Profile update error", error.message);
        throw error;
    }
};