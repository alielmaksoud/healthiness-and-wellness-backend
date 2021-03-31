import React from 'react'

function Payment() {
    return (
   <div>
  <style type="text/css" media="screen" dangerouslySetInnerHTML={{__html: "\n    input.invalid {\n      border: 2px solid red;\n    }\n\n    .validation.failed:after {\n      color: red;\n      content: 'Validation failed';\n    }\n\n    .validation.passed:after {\n      color: green;\n      content: 'Validation passed';\n    }\n  " }} />
  <form noValidate autoComplete="on">
    <h2>Card number formatting</h2>
    <input type="text" className="cc-number" pattern="\d*" x-autocompletetype="cc-number" placeholder="Card number" required />
    <h2>Expiry formatting</h2>
    <input type="text" className="cc-exp" pattern="\d*" x-autocompletetype="cc-exp" placeholder="Expires MM/YY" required maxLength={9} />
    <h2>CVC formatting</h2>
    <input type="text" className="cc-cvc" pattern="\d*" x-autocompletetype="cc-csc" placeholder="Security code" required autoComplete="off" />
    <h2>Restrict Numeric</h2>
    <input type="text" data-numeric />
    <h2 className="validation" />
    <button type="submit">Submit</button>
  </form>
</div>

    )
}

export default Payment
