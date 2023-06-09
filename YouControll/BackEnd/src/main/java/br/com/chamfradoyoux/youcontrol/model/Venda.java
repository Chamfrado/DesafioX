package br.com.chamfradoyoux.youcontrol.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clienteId;
    private String data;
    private String status;
    private Double valor;
    

    public Venda() {
    }

    public Venda(String data, Double valor,String status, Long clienteId) {
        this.data = data;
        this.valor = valor;
        this.clienteId = clienteId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Long getclienteId() {
        return clienteId;
    }

    public void setclienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
}