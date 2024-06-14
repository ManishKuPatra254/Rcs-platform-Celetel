// import { API_BASEURL } from '@/environment';
import axios from 'axios';
// import { API_BASEURL } from '/src/environment/index.jsx';

// console.log(API_BASEURL, "Apiurl");
export const registerUser = async (formData) => {
    try {
        const responseContact = await axios.post(`https://157.15.202.251/auth/register`, formData, {
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
        const response = await axios.post(`https://157.15.202.251/auth/login`, formData);
        // setting the responses................................
        const token = response.data.token;
        const typerole = response.data.type;
        // consoling whether the token is coming or not ...................................
        console.log(token, "whilelogintoken");
        console.log(typerole, "whilelogintyperole");
        // setting to the local storage....................................
        localStorage.setItem('token', token);
        localStorage.setItem('typerole', typerole);
        console.log(response.data.username, "res1");
        const username = response.data.username;
        localStorage.setItem('username', username);
        return response.data;

    } catch (error) {
        console.log("Login error", error.message);
        throw error;
    }
}

// user panel apis .............................................................


export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const responseContact = await axios.get(`https://157.15.202.251/profile/details`, {
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
        const response = await axios.put(`https://157.15.202.251/profile/update`, profile, {
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
        const response = await axios.put(`https://157.15.202.251/profile/change-password`, password, {
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


export const createBots = async (createBot) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`https://157.15.202.251/api/bot`, createBot, {
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


export const getBots = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://157.15.202.251/api/botIds`, {
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
        const response = await axios.put(`https://157.15.202.251/api/botId`, currentBotId, {
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
        const responseContact = await axios.get(`https://157.15.202.251/api/campaigns`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(responseContact.data, "responseContact");
        if (responseContact.data.campaigns && Array.isArray(responseContact.data.campaigns)) {
            console.log(responseContact.data.campaigns[0]._id, "first campaign id");
        } else {
            console.log("Campaigns data is not in the expected format or is missing");
        }

        return responseContact.data;
    } catch (error) {
        console.log("Profile fetch error", error.message);
        throw error;
    }
}



export const createCampaigns = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`https://157.15.202.251/api/campaigns/create-campaign`, formData, {
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


export const startCampaign = async (campaignId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `https://157.15.202.251/api/campaigns/start-campaign/${campaignId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error starting campaign:", error.message);
        throw error;
    }
};


export const getTemplateDetailsList = async () => {
    const token = localStorage.getItem('token');

    try {
        const responseContact = await axios.get(`https://157.15.202.251/api/template/all`, {
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
        const response = await axios.post(`https://main-rcs.vercel.app/api/template`, createTemplates, {
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




export const getTemplatedataById = async (id) => {
    console.log(id, "templateid");
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`https://157.15.202.251/api/template/details/${id}`, {
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
        const response = await axios.put(`https://157.15.202.251/api/template/update/${id}`, updatedData, {
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


export const getCampaignsDetailsResponse = async (campaignId) => {
    console.log(campaignId, "campaignresponse");
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`https://157.15.202.251/api/campaigns/responses?campaignId=${campaignId}`, {
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



// admin panel apis .............................................................

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`https://157.15.202.251/api/admin/users`, {
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



export const getUsersByEmail = async (email) => {
    console.log(email, "emailid");
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`https://157.15.202.251/api/admin/user/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        console.log("Error in getting id", error.message);
        throw error;
    }
};



export const updateUsersByEmail = async (updateUser) => {
    console.log(updateUser, "updateusers");
    const token = localStorage.getItem('token');

    try {
        const response = await axios.put(`https://157.15.202.251/api/admin/user`, updateUser, {
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