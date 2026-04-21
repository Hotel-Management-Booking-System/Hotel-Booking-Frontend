import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Promotion, CreatePromotion } from '../../../models/promotion.model';

// Admin: Promotions - manage discount promo codes.
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  promotions: Promotion[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  showForm: boolean = false;
  isEditing: boolean = false;
  editingPromoId: number = 0;

  promoForm: CreatePromotion = this.getEmptyForm();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  getEmptyForm(): CreatePromotion {
    return {
      code: '',
      description: '',
      discountPercent: 10,
      startDate: '',
      endDate: '',
      isActive: true
    };
  }

  loadPromotions(): void {
    this.isLoading = true;

    this.userService.getAllPromotions().subscribe({
      next: (data) => {
        this.promotions = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load promotions.';
        this.isLoading = false;
      }
    });
  }

  openCreateForm(): void {
    this.promoForm = this.getEmptyForm();
    this.isEditing = false;
    this.showForm = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  openEditForm(promo: Promotion): void {
    this.promoForm = {
      code: promo.code,
      description: promo.description,
      discountPercent: promo.discountPercent,
      startDate: promo.startDate.substring(0, 10),   // format for date input
      endDate: promo.endDate.substring(0, 10),
      isActive: promo.isActive
    };
    this.editingPromoId = promo.id;
    this.isEditing = true;
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  savePromotion(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditing) {
      this.userService.updatePromotion(this.editingPromoId, this.promoForm).subscribe({
        next: () => {
          this.successMessage = 'Promotion updated.';
          this.showForm = false;
          this.loadPromotions();
        },
        error: () => {
          this.errorMessage = 'Failed to update promotion.';
        }
      });
    } else {
      this.userService.createPromotion(this.promoForm).subscribe({
        next: () => {
          this.successMessage = 'Promotion created.';
          this.showForm = false;
          this.loadPromotions();
        },
        error: () => {
          this.errorMessage = 'Failed to create promotion.';
        }
      });
    }
  }

  deletePromotion(id: number): void {
    if (!confirm('Delete this promotion?')) return;

    this.userService.deletePromotion(id).subscribe({
      next: () => {
        this.successMessage = 'Promotion deleted.';
        this.promotions = this.promotions.filter(p => p.id !== id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete promotion.';
      }
    });
  }
}
