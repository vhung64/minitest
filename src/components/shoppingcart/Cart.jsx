import React, { useState } from 'react'

function Cart() {
    const [productlist, setProducList] = useState([
        {
            id: 1,
            name: "Sản phẩm 1",
            image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
            price: 300000,
            count: 1,
            size: "M"
        },
        {
            id: 2,
            name: "Sản phẩm 2",
            image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
            price: 400000,
            count: 1,
            size: "L"
        },
        {
            id: 3,
            name: "Sản phẩm 3",
            image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
            price: 500000,
            count: 1,
            size: "XL"
        }
    ])
    let total = 0;
    productlist.map(product => {
        total += product.price * product.count;
        return total;
    });
    const intToVND = (i) => {
        return i.toLocaleString('en-US', { currency: 'VND' }) + ' VND';
    }
    const decrement = (id) => {
        const newList = productlist.map(p => {
            if (p.id === id) {
                if (p.count === 1) {
                }else {
                    return { ...p, count: p.count - 1 };
                }
            }
            return p;
        })
        setProducList(newList);
    }
    const increment = (id) => {
        const newList = productlist.map(p => {
            if (p.id === id) {
                return { ...p, count: p.count + 1 };
            }
            return p;
        })
        setProducList(newList);
    }

    const deleteProduct = (id) => {
        const text = 'Bạn có muốn xóa sản phẩm này không ?';
        if(window.confirm(text)){
            const newList = productlist.filter(p => p.id !== id);
            setProducList(newList);
        }else {
            return;
        }
        
    }
    return (
        <>
            <div className="shopping-cart-container mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-4">
                                <h2>Shopping Cart</h2>
                            </div>
                        </div>
                    </div>
                    {productlist.length === 0 && (
                        <p className="fst-italic message">Không có sản phẩm trong giỏ hàng</p>
                    )}
                    {productlist.length > 0 && (
                        <div className="row shopping-cart">
                        <div className="col-md-8">
                            <div className="product-list">
                                {productlist.map(product => (
                                    <div key={product.id} className="product-item d-flex border mb-4">
                                        <div className="image">
                                            <img src={product.image} alt="sản phẩm 1" />
                                        </div>
                                        <div className="info d-flex flex-column justify-content-between px-4 py-3 flex-grow-1">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h2 className="text-dark fs-5 fw-normal">
                                                        {`${product.name} (${product.size})`}
                                                    </h2>
                                                    <h2 className="text-danger fs-5 fw-normal">
                                                        {intToVND(product.price)}
                                                    </h2>
                                                </div>
                                                <div className="text-black-50">
                                                    <div className="d-inline-block me-3">
                                                        <button className="border py-2 px-3 d-inline-block fw-bold bg-light" onClick={() => decrement(product.id)}>-</button>
                                                        <span className="py-2 px-3 d-inline-block fw-bold">{product.count}</span>
                                                        <button className="border py-2 px-3 d-inline-block fw-bold bg-light" onClick={() => increment(product.id)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="text-primary border-0 bg-transparent fw-light" onClick={() => deleteProduct(product.id)}>
                                                    <span><i className="fa-solid fa-trash-can"></i></span>
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bill">
                                <div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
                                    <span className="text-black-50">Tạm tính:</span>
                                    <span className="text-primary" id="sub-total-money">{intToVND(total)}</span>
                                </div>
                                <div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
                                    <span className="text-black-50">VAT (10%):</span>
                                    <span className="text-primary" id="vat-money">{intToVND(total * 0.1)}</span>
                                </div>
                                <div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
                                    <span className="text-black-50">Thành tiền:</span>
                                    <span className="text-primary" id="total-money">{intToVND(total * 1.1)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default Cart