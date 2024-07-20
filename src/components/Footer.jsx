import React from 'react'

function Footer() {
  return (
    <footer className='footer'>
        <div className='container mt-5'>
          <div className='row py-4'>
            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4'>
              <div>
                <h2 className='fw-semibold mb-2'>ProGoods Inventory</h2>
                <p>Professional inventory management for your business success.</p>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4'>
              <div>
                <h2 className='fw-semibold mb-2'>Contact Us</h2>
                <p><b>Phone: </b>+91 9876543211</p>
                <p><b>Email: </b>progoods@gmail.com</p>
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-4'>
              <div>
                <h2 className='fw-semibold mb-2'>Follow Us</h2>
                <div className='d-flex gap-2'>
                  <button className="btn btn-outline-light"><i className="bi bi-facebook"></i></button>
                  <button className="btn btn-outline-light"><i className="bi bi-twitter-x"></i></button>
                  <button className="btn btn-outline-light"><i className="bi bi-linkedin"></i></button>
                  <button className="btn btn-outline-light"><i className="bi bi-instagram"></i></button>
                </div>
                  
              </div>
            </div>
          </div>
          <div className='row d-flex justify-content-center py-2'>
            <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
              <p className='text-center'>&copy;2024 ProGoods Inventory Management System</p>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer