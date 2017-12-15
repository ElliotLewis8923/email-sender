import React from 'react'
import classnames from 'classnames'
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

export default props => {
  const childProps = { 
    ...props,
    className: classnames('form-control', 'react-tagsinput', { 'has-error': props.error }),
    inputProps: {
      placeholder: '',
      id: props.id
    },
    validationRegex: /.+\@.+\..+/
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id} className="col-sm-2 control-label">{props.label}</label>
      <div className="col-sm-10">
        <TagsInput {...childProps} />
        {props.error && (
          <div>
            <small className="form-text text-danger">{props.error}</small>
          </div>
        )}
      </div>
    </div>
  )
}
