import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateIssue = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [newIssue, setNewIssue] = useState({
        title: "",
        comment: "",
        created: "",
        isCompleted: false,
        hasReminder: false
    });
    
    const onIssueChange = (e) => {
        const [name, value] = e.target;
        setNewIssue(values => ({ ...values, [name]: value }))
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <button onClick={ handleBack }>Go Back</button>
            <p>{ location.state }</p>
        </div>
    )
}

export default CreateIssue;