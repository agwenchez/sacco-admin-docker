import React, { Fragment, useState } from 'react';
// import Message from './Message';
// import Progress from './Progress';
import axios from 'axios';
import AppWrapper from '../AppWrapper';
import { toast } from 'react-toastify';
import { Upload, PlusSquare } from 'react-feather';
import Breadcrumb from '../../layout/breadcrumb';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card } from 'reactstrap';

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com/`
})

const Message = ({ msg }) => {
    return (
        <div className='alert alert-info alert-dismissible fade show' role='alert'>
            {msg}
            <button
                type='button'
                className='close'
                data-dismiss='alert'
                aria-label='Close'
            >
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>
    );
};

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    // const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);


        try {
            const res = await api.post('/upload/exceltojson', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // onUploadProgress: progressEvent => {
                //   setUploadPercentage(
                //     parseInt(
                //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
                //     )
                //   );
                // }
            });

            // Clear percentage
            // setTimeout(() => setUploadPercentage(0), 10000);
            console.log("Data", res.data)
            if (res.data === "All members added successfully") {
                const { fileName, filePath } = res.data;
                setUploadedFile({ fileName, filePath });
                // alert("file uploaded")
                toast.success('All members added successfully')

            }else if (res.data === 'Kindly provide a file') {
                toast.error('No file chosen')
            }

        } catch (err) {
            if (err == 'Error: Request failed with status code 409') {
                toast.error('Duplicate values in members unique columns')
            } else {
                toast.error(err)
            }
            // setUploadPercentage(0)
        }
    };


    return (
        <Fragment>
            <AppWrapper>
                <Breadcrumb parent="Dashboard" title="Import Members" />
                <Container fluid={true}>
                    {/* {message ? <Message msg={message} /> : null} */}
                    <form onSubmit={onSubmit} style={{ paddingTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent:'space-between'}}>
                            <div className='custom-file'>
                                <input                     
                                    type='file'
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={onChange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    {filename}
                                </label>
                            </div>

                            {/* <Progress percentage={uploadPercentage} /> */}
                            {/* <Upload /> */}
                            <input
                                style={{ marginRight: '50%', marginLeft:'2%' }}
                                type='submit'
                                value='Upload'
                                className='btn btn-air-* btn-outline-primary'
                            />
                        </div>
                    </form>
                    {uploadedFile ? (
                        <div className='row mt-5'>
                            <div className='col-md-6 m-auto'>
                                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                            </div>
                        </div>
                    ) : null}
                </Container>
            </AppWrapper>
        </Fragment>
    );
};

export default withRouter(FileUpload);
