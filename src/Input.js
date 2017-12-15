import React from 'react'
import classnames from 'classnames'

export default props => {
  const childProps = { 
    ...props, 
    className: classnames('form-control', { 'has-error': props.error }),
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id} className="col-sm-2 control-label">{props.label}</label>
      <div className="col-sm-10">
        {props.isTextArea ? (<textarea {...childProps} />) : (<input {...childProps} />)}
        {props.error && (
          <div>
            <small className="form-text text-danger">{props.error}</small>
          </div>
        )}
      </div>
    </div>
  )
}

