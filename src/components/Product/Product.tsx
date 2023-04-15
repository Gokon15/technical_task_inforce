import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductAsync } from '../../async-actions/productsAction'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { showWIndowActionCreator } from '../../store/reducers/modalWindowReducer'
import Comments from '../Comments/Comments'
import ModalWindow from '../ModalWindow/ModalWindow'
import Preloader from '../Preloader/Preloader'

const Product:FC = () => {
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const {id} = useParams<{id: string}>()
  const idNum = id ? + id : 0
  const {hidden} = useTypedSelector(state => state.modalWindow)
  const {selectedProduct} = useTypedSelector(state => state.products)
    const {isLoading} = useTypedSelector(state => state.preloader)


  useEffect(()=>{
      dispatch(getProductAsync(idNum))

  },[dispatch, idNum])

  return (
    <div >
      {hidden
        ? <></>
        :<ModalWindow id={idNum} input={true} product={selectedProduct}></ModalWindow>}
      <span >{selectedProduct?.name}</span>
      {isLoading
        ? <Preloader/>
        : <>
          {selectedProduct?.imageUrl && <><span>Image</span>
          <img src={selectedProduct?.imageUrl} alt={selectedProduct?.name}></img></>}

          {<><span>Count</span>
          <p >{selectedProduct?.count}</p></>}

          {<><span>Width</span>
          <p>{selectedProduct?.size?.width}</p></>}

          {<><span>Height</span>
          <p >{selectedProduct?.size?.height}</p></>}

          {selectedProduct?.weight && <><span>Weight</span>
          <p>{selectedProduct?.weight}</p></>}

          <button onClick={(e)=>dispatch(showWIndowActionCreator())} >Edit</button>
        </>
      }
      <button onClick={(e)=>navigate('/')} >See all</button>
      <Comments id={idNum}></Comments>

    </div>
  )
}

export default Product
