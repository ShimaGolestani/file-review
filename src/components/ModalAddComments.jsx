import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { setComments, setShowModalAddComments } from '../redux/home/home-action'

const ModalAddComment = (props) => {

    const dispatch = useDispatch()
    const { modalAddComments, comments, currentSymbol } = useSelector(state => state.home)
    const [text, setText] = useState('')

    const handleClose = () => {
        dispatch(setShowModalAddComments(false))
    }

    useEffect(() => {
      
        const cm = comments.find(o => o.id === currentSymbol.id)
        if(cm) {
            setText(cm.text)
        } else {
            setText('')
        }

    }, [currentSymbol])
    

    const onSubmit = () => {
        const cm = [...comments]
        const index = cm.findIndex(o => o.id === currentSymbol.id)
        if(index != -1) {
            cm[index].text=text
        } else {
            cm.push({
                ...currentSymbol,
                text
            })
        }
        dispatch(setComments(cm))
        handleClose()
    }

    return (
        <Modal show={modalAddComments} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className='text-black'>یادداشت</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea placeholder='توضیح خود را بنویسید' value={text} onChange={(e) => setText(e.target.value)} className='w-full h-28 bg-search-color rounded-xl p-3 text-sm text-black' />
                <Button onClick={onSubmit} className='mt-2 btncomment' >ذخیره</Button>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAddComment