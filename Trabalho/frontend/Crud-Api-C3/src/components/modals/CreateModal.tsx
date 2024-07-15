import { useState } from "react";

interface CreateModalProps {
    onClose: () => void;
    handleCreate: (name: string, description: string) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onClose, handleCreate }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateProject = () => {
        handleCreate(name, description);
        onClose();
    }


    return (
        <div className="">
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header flex justify-content-between">
                                <h5 className="modal-title">Criar Projeto</h5>
                                <button onClick={() => onClose()} className="btn" type="button">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nome do Projeto:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Descrição do Projeto:</label>
                                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => onClose()} className="btn btn-secondary">Fechar</button>
                                <button onClick={() => handleCreateProject()} className="btn btn-primary">Saver Mudanças</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal;