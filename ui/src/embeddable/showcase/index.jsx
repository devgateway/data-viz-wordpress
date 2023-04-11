import React, {useCallback, useEffect, ***REMOVED***, useState} from 'react'
import {Button, Container, Dropdown, Form, Grid, Input, Label, Message, TextArea, Icon} from 'semantic-ui-react'
import ***REMOVED*** from '../../countries'
import {reset, ***REMOVED***} from "../reducers/embeddable";
import {connect} from "react-redux";
import {useDropzone} from "react-dropzone";
import configData from "../../conf/config.json";

const options = ***REMOVED***.map(c => {
    return {
        flag: c.flag.***REMOVED***(),
        value: c.text,
        text: c.text
    }
})

const recaptchaRef = React.createRef();


function FileUploader({***REMOVED***, ***REMOVED***, inputRef, name}) {
    const [files, setFiles] = useState([])
    const [errors, setErrors] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles([...files, ...acceptedFiles])
        setErrors([])
    }, [files])

    const ***REMOVED*** =  useCallback(rejectedFiles => {
        setErrors([...rejectedFiles])
    }, [files])

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        open
    } = useDropzone({accept: 'application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif', maxFiles: 5, multiple: true, onDrop, ***REMOVED***});

    ***REMOVED***(inputRef, () => ({
        name,
        reset: () => {
            setFiles([])
        },
        hasErrors: () => files.length == 0,
        value: () => files
    }));

    const remove = file => {
        const newFiles = [...files]
        newFiles.splice(file, 1)
        setFiles(newFiles)
      };

    const hasErrors = files.length === 0
    return (<>
         {errors && errors[0] && errors[0].errors &&
           <Container fluid className={`upload files ${hasErrors ? 'error' : ''}`}>
               <div className="error-messages">
            <ul style={{}}>
          {errors[0].errors.map( e => {
                   return (<li>{"File type not allowed. File type must be - application/-pdf,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif "}</li>)
          })}
          </ul>
          </div>
         </Container>
        }

        <Container fluid className={`upload files`}>
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()}/>
                <p>Drag 'n' drop files here, or click select button to select files. The maximum file size allowed is {configData.***REMOVED***}MB.</p>
                {files.length > 0 ? <ul>
                    {files.map((f, i) => <li><Label color="green" icon='file'>{f.name}</Label>
                    <Icon color="red" name='remove' size='large' onClick={(e) =>{ e.***REMOVED***(); remove(i);}}/>
                    </li>)}
                </ul> : null}

            </div>
            <Button secondary onClick={open}>Select</Button>
        </Container>
        </>
    );
}


const ***REMOVED*** = ({options, placeholder, name, required, ***REMOVED***, icon, inputRef}) => {

    const [value, setValue] = useState(null)
    const [error, setError] = useState(true)

    useEffect(() => {
        if (required && value == null) {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])


    ***REMOVED***(inputRef, () => ({
        name,
        reset: () => {
            setValue(null)
        },
        value: () => value,
        hasErrors: () =>{
            console.log(error)
            return error
        }
    }));

    return <Dropdown
        value={value}

        error={error && ***REMOVED***}
        name={name}
        onChange={(e, value) => {
            setValue(value.value)

        }}
        fluid
        multiple={false}
        search
        selection
        options={options}
        placeholder={placeholder}

    />
}


const ***REMOVED*** = ({placeholder, name, icon, required, pattern, as, inputRef, ***REMOVED***}) => {
    const [value, setValue] = useState("")
    const [error, setError] = useState(true)

    useEffect(() => {
        if ((required && value.trim() == "") || (pattern && !pattern.test(value))) {
            setError(true)
        } else {
            setError(false)
        }
    }, [value])


    ***REMOVED***(inputRef, () => ({
        name,
        reset: () => {
            setValue("")
        },
        hasErrors: () => error,
        value: () => value
    }));


    const C = as ? as : Input
    return <C
        value={value}

        error={error && ***REMOVED***}
        onChange={e => setValue(e.target.value)}
        name={name} icon={icon}
        iconPosition='left'
        placeholder={placeholder}/>

}


class Index extends React.Component {
    state = {};
    iframe = React.createRef();

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this)
        this.reset = this.reset.bind(this)
        this.captchaChange = this.captchaChange.bind(this)
        this.inputs = {};

        this.setInput = this.setInput.bind(this)
    }


    ***REMOVED***() {

    }

    captchaChange(value) {
        this.setState({token: value})
    }


    setInput(el) {
        if (el) {
            this.inputs[el.name] = el
        }

    }


    reset() {

        const elements = Object.keys(this.inputs).map(k => this.inputs[k])
        elements.forEach(e => {
            e.reset()
        })
        this.setState({***REMOVED***: false, status: null})
        this.props.onReset()
    }

    submitForm(e) {
        const elements = Object.keys(this.inputs).map(k => this.inputs[k])
        let hasErrors = elements.map(e => e.hasErrors()).reduce((a, b) => a || b)
        const files = this.state.files
        //hasErrors = hasErrors || this.state.token == null
        if (hasErrors) {
            this.setState({***REMOVED***: true})
        } else {
            const values = {}
            elements.forEach(e => values[e.name] = e.value())
            //  values['token'] = this.state.token
            this.props.onSubmit(values)
             setTimeout(()=>{
                    this.reset()
                }, 5000)
        }
}


    render() {
        const {
            status,
            organization = "Organization",
            name = "Name",
            email = "Email",
            country = "Country",
            message = "Message",
            resetlabel = "Reset",
            submitlabel = "Submit",
            ***REMOVED*** = "Thanks for submitting your data",
            ***REMOVED*** = "Something didn't go well, please try again later",
            editing
        } = this.props
        const {***REMOVED***, token, reset} = this.state

        return <Container fluid={true} className="tcdi showcase">

             {/*(status == 'ERROR' || editing) && <Message negative>
                <p>{***REMOVED***}</p>
            </Message>}

            {(status == 'OK' || editing) && <Message
                success
                content={<p>{***REMOVED***}</p>}
           />*/}

            <Grid columns={1} className={this.state.***REMOVED*** ? 'validated' : ''}>
                <Grid.Column>
                    <***REMOVED*** inputRef={el => this.setInput(el)} ***REMOVED***={***REMOVED***} required={true}
                                    icon={"building"}
                                    name={"organization"} placeholder={organization}/>
                </Grid.Column>

                <Grid.Column>
                    <***REMOVED*** inputRef={el => this.setInput(el)} ***REMOVED***={***REMOVED***} required={true}
                                    icon={"user"}
                                    name={"name"}
                                    placeholder={name}/>
                </Grid.Column>

                <Grid.Column>
                    <***REMOVED***

                        inputRef={el => this.setInput(el)} ***REMOVED***={***REMOVED***} required={true}
                        pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
                        icon={"envelope"}
                        placeholder={email}
                        name={"email"}/>
                </Grid.Column>

                <Grid.Column>
                    <Form.Field>
                        <***REMOVED*** inputRef={el => this.setInput(el)}
                                           ***REMOVED***={***REMOVED***}
                                           name={"country"}
                                           required={true}
                                           options={options}
                                           placeholder={country}/>
                    </Form.Field>
                </Grid.Column>

                <Grid.Column>

                    <FileUploader inputRef={el => this.setInput(el)}
                                  ***REMOVED***={***REMOVED***}
                                  name="files"></FileUploader>

                </Grid.Column>

                <Grid.Column>
                    <***REMOVED*** inputRef={el => this.setInput(el)} placeholder={message} name={"message"}
                                    as={TextArea}/>
                </Grid.Column>


                <Grid.Row>

                    <Grid.Column textAlign={"left"} width={12} verticalAlign="bottom" className="form-buttons">
                        <Button className="btn-reset"
                                onClick={e => this.reset()}>{resetlabel}</Button>
                        <Button secondary={true}
                                onClick={e => this.submitForm()}>{submitlabel}</Button>
                    </Grid.Column>
                    {(status == 'OK' || editing) && <Grid.Column width={16}> <Message
                    success
                    content={<p>{***REMOVED***}</p>}
                /></Grid.Column>}

                {(status == 'ERROR' || editing) && <Grid.Column width={16}> <Message negative>
                    <p>{***REMOVED***}</p>
                </Message></Grid.Column>}

                </Grid.Row>




            </Grid>

        </Container>
    }
}


const ***REMOVED*** = (state, ownProps) => {
    return {
        status: state.getIn(['embeddable', 'showCase', 'status'])
    }
}

const ***REMOVED*** = {
    onSubmit: ***REMOVED***,
    onReset: reset
};

export default connect(***REMOVED***, ***REMOVED***)(Index)
