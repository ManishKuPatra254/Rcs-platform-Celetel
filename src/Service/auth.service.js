import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (formData) => {
    try {
        const responseContact = await axios.post(`${API_URL}/auth/register`, formData, {
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
        const response = await axios.post(`${API_URL}/auth/login`, formData);

        // Generate a unique session ID for this login
        const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

        // Create a new login object with the sessionId
        const newLogin = {
            sessionId: sessionId,
            token: response.data.token,
            typerole: response.data.type,
            username: response.data.username,
        };

        // Retrieve the existing logins from the cookies
        let existingLogins = Cookies.get('logins');
        existingLogins = existingLogins ? JSON.parse(existingLogins) : [];

        // Add the new login to the array
        existingLogins.push(newLogin);

        // Store the updated array in the cookies
        Cookies.set('logins', JSON.stringify(existingLogins));

        // Store the sessionId in the cookies for this tab
        Cookies.set('activeSessionId', sessionId);

        // Optional: Log the details to the console
        console.log(newLogin.token, "whilelogintoken");
        console.log(newLogin.typerole, "whilelogintyperole");
        console.log(newLogin.username, "res1");

        return response.data;

    } catch (error) {
        console.log("Login error", error.message);
        throw error;
    }
}

export const getCurrentLogin = () => {
    // Fetch the active session ID from the cookies
    const activeSessionId = Cookies.get('activeSessionId');

    // Fetch all login sessions from the cookies
    const logins = JSON.parse(Cookies.get('logins') || '[]');

    // Find and return the login session that matches the active session ID
    return logins.find(login => login.sessionId === activeSessionId);
}


// user panel apis .............................................................

export const getProfile = async () => {
    try {
        // Retrieve the 'logins' cookie and parse it
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        // Make the profile request with the token
        const responseContact = await axios.get(`${API_URL}/profile/details`, {
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
        // Retrieve the 'logins' cookie and parse it
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.put(`${API_URL}/profile/update`, profile, {
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
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }
        const response = await axios.put(`${API_URL}/profile/change-password`, password, {
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
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.post(`${API_URL}/api/bot`, createBot, {
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
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }
        const response = await axios.get(`${API_URL}/api/botIds`, {
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
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.put(`${API_URL}/api/botId`, currentBotId, {
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



export const getCampaignsDetails = async (page, limit) => {
    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const responseContact = await axios.get(`${API_URL}/api/campaigns`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page,
                limit: limit
            }
        });

        console.log(responseContact.data, "responseContact");
        console.log(`Fetching campaigns with page: ${page}, limit: ${limit}`);
        if (responseContact.data.campaigns && Array.isArray(responseContact.data.campaigns)) {
            console.log(responseContact.data.campaigns[0]._id, "first campaign id");
        } else {
            console.log("Campaigns data is not in the expected format or is missing");
        }

        return responseContact.data;
    } catch (error) {
        console.log("error", error.message);
        throw error;
    }
}



export const createCampaigns = async (formData) => {
    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.post(`${API_URL}/api/campaigns/create-campaign`, formData, {
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



export const uploadFileCampaigns = async (file) => {
    console.log(file, 'fileupload');
    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.post(`${API_URL}/api/campaigns/uploadFile`, file, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data, 'datares');
        return response.data;
    } catch (error) {
        console.log("error", error.message);
        throw error;
    }
}


export const startCampaign = async (campaignId) => {
    try {
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }
        const response = await axios.post(`${API_URL}/api/campaigns/start-campaign/${campaignId}`,
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

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const responseContact = await axios.get(`${API_URL}/api/template/all`, {
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
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

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

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.get(`${API_URL}/api/template/details/${id}`, {
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

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.put(`${API_URL}/api/template/update/${id}`, updatedData, {
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


export const searchCampaigns = async (query) => {

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.get(`${API_URL}/api/campaigns/search?query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        console.log("Campaign search error", error.message);
        throw error;
    }
}



export const getCampaignsDetailsResponse = async (campaignId, page, limit) => {
    console.log(campaignId, "campaignresponse");

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.get(`${API_URL}/api/campaigns/responses`, {
            params: {
                campaignId,
                page,
                limit
            },
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



export const getDashboardData = async () => {

    try {
        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }


        const response = await axios.get(`${API_URL}/api/dashboard/stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        console.log("error", error.message);
        throw error;
    }
};


export const getWeelyAndDaliyStats = async () => {

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'user');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.get(`${API_URL}/api/dashboard/weekly-daily-stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        console.log("error", error.message);
        throw error;
    }
};




// admin panel apis .............................................................

export const getAllUsers = async () => {

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'admin');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.get(`${API_URL}/api/admin/users`, {
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

    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'admin');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }


        const response = await axios.get(`${API_URL}/api/admin/user/${email}`, {
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


    try {

        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'admin');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.put(`${API_URL}/api/admin/user`, updateUser, {
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


export const addBalanceToSpecificUser = async (formData) => {

    try {


        const logins = Cookies.get('logins');
        let token = null;

        if (logins) {
            try {
                const parsedLogins = JSON.parse(logins);
                // Find the login object with the desired typerole
                const currentLogin = parsedLogins.find(login => login.typerole === 'admin');
                // Change 'user' to the desired typerole if needed
                if (currentLogin) {
                    token = currentLogin.token;
                    console.log(currentLogin, "login profile")
                }
            } catch (error) {
                console.error("Failed to parse logins cookie:", error.message);
            }
        }

        if (!token) {
            throw new Error("No valid token found for the specified role.");
        }

        const response = await axios.post(`${API_URL}/api/admin/add-balance`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data, "response data balance");
        return response.data;
    } catch (error) {
        console.log("error", error.message);
        throw error;
    }
};