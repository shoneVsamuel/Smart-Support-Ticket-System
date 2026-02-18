from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Avg
from django.utils.timezone import now
from django.db.models.functions import TruncDay
from .models import Ticket
from .serializers import TicketSerializer
from .llm import classify_ticket

class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description"]

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get("category")
        priority = self.request.query_params.get("priority")
        status_param = self.request.query_params.get("status")
        if category:
            qs = qs.filter(category=category)
        if priority:
            qs = qs.filter(priority=priority)
        if status_param:
            qs = qs.filter(status=status_param)
        return qs

class TicketUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketStatsView(APIView):
    def get(self, request):
        total = Ticket.objects.count()
        open_count = Ticket.objects.filter(status="open").count()

        per_day = (
            Ticket.objects.annotate(day=TruncDay("created_at"))
            .values("day")
            .annotate(count=Count("id"))
            .aggregate(avg=Avg("count"))["avg"]
        )

        priority_breakdown = Ticket.objects.values("priority").annotate(count=Count("id"))
        category_breakdown = Ticket.objects.values("category").annotate(count=Count("id"))

        return Response({
            "total_tickets": total,
            "open_tickets": open_count,
            "avg_tickets_per_day": per_day or 0,
            "priority_breakdown": list(priority_breakdown),
            "category_breakdown": list(category_breakdown),
        })

class TicketClassifyView(APIView):
    def post(self, request):
        description = request.data.get("description", "")
        suggested = classify_ticket(description)
        return Response(suggested, status=status.HTTP_200_OK)