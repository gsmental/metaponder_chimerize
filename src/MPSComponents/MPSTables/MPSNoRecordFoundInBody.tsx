import React from "react";

const MPSNoRecordFoundInBody = () => {
  return (
    <tbody>
      <tr>
        <td colSpan={20}>
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-4">
            <h5 className="text-primary">No Records Found</h5>
            <p className="text-muted">
              We couldn't find any data at the moment.
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default MPSNoRecordFoundInBody;
