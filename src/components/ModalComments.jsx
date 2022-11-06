import { Table } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModalComments } from '../redux/home/home-action'

const ModalComments = () => {

    const dispatch = useDispatch()
    const { modalComments, comments } = useSelector(state => state.home)

    const handleClose = () => {
        dispatch(setShowModalComments(false))
    }

    return (
        <Modal show={modalComments} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>کامنت ها</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    comments?.length > 0 ?
                    <Table>
                    <thead className='bg-table-header'>
                        <tr className='text-sm'>
                            <th className='rounded-tr-2.5x py-3 text-center text-black'>نام نماد</th>
                            <th className='rounded-tl-2.5x py-3 text-center text-black'>یادداشت</th>
                        </tr>
                    </thead>
                    <tbody className='tbody text-sm'>
                        {
                            comments?.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className='text-center'>{item.symbol}</td>
                                        <td className='text-center'>{item.text}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                :
                <div className='text-sm text-center text-gray-400'>هیچ یادداشتی وجود ندارد</div>
                }
                
            </Modal.Body>
        </Modal>
    )
}

export default ModalComments