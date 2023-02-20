import style from './details.module.css'
import horseWalk from '../../assets/slider/horseWalk.png'
import { Modal } from '../modal/modal'
import { Application } from '../application/application'
import { useSelector, useDispatch } from 'react-redux'
import { openModal, closeModalDetail } from '../../store/modal/actions'

export const arrDetails = [
    {
        id: 1,
        title: 'Конная прогулка',
        price: 'от 990 ₽',
        img: horseWalk
    }
]

const Details = () => {
    const modalShow = useSelector(store => store.modal.modalShow)

    const dispatch = useDispatch()

    const handleOpenModal = (event) => {
        event.preventDefault()
        dispatch(openModal(true))
        dispatch(closeModalDetail(false))
    }

    return (
        <>
            {
                arrDetails.map(item => (
                    <form className={style.details}>
                        <div className={style.details__head}>
                            <h2 className={style.details__head__title} >{item.title}</h2>
                            <h1 className={style.details__price} >{item.price}</h1>
                        </div>
                        <button className={style.details__btn} onClick={(event) => handleOpenModal(event)}>Заказать впечатление</button>
                        <img src={item.img} alt="img" />
                        <p> Тут будет добавлена подробная информация </p>
                    </form>
                ))
            }
            {
                modalShow &&
                <Modal>
                    <Application />
                </Modal>
            }
        </>
    )
}

export default Details